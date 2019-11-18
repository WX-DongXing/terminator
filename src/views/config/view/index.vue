/**
* 视图配置模板
* Author: dong xing
* Date: 2019/11/13
* Time: 1:44 下午
* Email: dong.xing@outlook.com
*/
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
    isSubscribed: true,
    config: null,
    viewService: new ViewService(),
  }),
  subscriptions() {
    this.change$ = new Subject();
    merge(this.change$)
      .pipe(
        takeWhile(() => this.isSubscribed),
      )
      .subscribe(event => this.viewService.next(event));
    return {};
  },
  created() {
    this.config = _.cloneDeep(this.activeWidget.config.commonConfig);
  },
  computed: {
    ...mapState('screen', ['activeWidget']),
  },
  beforeDestroy() {
    this.isSubscribed = false;
  },
};
</script>

<style scoped lang="less">
.view-config {
  height: 100%;
  width: 100%;
  overflow: auto;
  padding-top: 16px;

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
