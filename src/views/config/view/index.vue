<template>
  <div class="comment-template">
    <p class="comment-template__name">画板</p>
    <div class="view-config">
      <p class="comment-template__title">尺寸</p>
      <div class="comment-template__content view-config__content">
        <a-input type="number"
                 addonBefore="宽"
                 v-model="config.width"
                 @change="() => change$.next({ type: 'width', value: Number(config.width) })" />
        <a-input type="number"
                 addonBefore="高"
                 v-model="config.height"
                 @change="() => change$.next({ type: 'height', value: Number(config.height) })" />

      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/less/template.less';
import { Subject, merge } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { mapState } from 'vuex';
import _ from 'lodash';
import ViewService from './index';

export default {
  name: 'ViewConfig',
  data: () => ({
    subscribed: true,
    config: null,
    viewService: new ViewService(),
  }),
  domStreams: ['widthChange$', 'widthChange$'],
  subscriptions() {
    this.change$ = new Subject();
    merge(this.change$)
      .pipe(
        takeWhile(() => this.subscribed),
      )
      .subscribe(event => this.viewService.next(event));
    return {};
  },
  created() {
    this.config = _.cloneDeep(this.activeWidget.config);
  },
  computed: {
    ...mapState('screen', ['activeWidget']),
  },
  beforeDestroy() {
    this.subscribed = false;
  },
};
</script>

<style scoped lang="less">
.view-config {
  height: 100%;
  width: 100%;
  overflow: auto;

  &__content {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;

    .ant-input-group-wrapper {
      margin: 0 12px;
    }
  }
}
</style>
