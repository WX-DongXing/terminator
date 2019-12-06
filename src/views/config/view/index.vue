/**
* 视图配置模板
* Author: dong xing
* Date: 2019/11/13
* Time: 1:44 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="comment-template">
    <div class="comment-template__header">
      <p class="comment-template__name">画板</p>
    </div>

    <!-- S 视图配置 -->
    <div class="view-config">
      <a-collapse :activeKey="[1, 2]" :bordered="false">

        <!-- S 尺寸 -->
        <a-collapse-panel header="尺寸" key="1">

          <div class="comment-template__item">
            <p class="comment-template__leading">宽:</p>
            <div class="comment-template__inner">
              <a-input
                type="number"
                v-model="config.width"
                @change="() => viewService.next({
                  type: 'width',
                  value: Number(config.width)
                })" />
            </div>
          </div>
          <!-- / 宽 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">高:</p>
            <div class="comment-template__inner">
              <a-input
                type="number"
                v-model="config.height"
                @change="() => viewService.next({
                  type: 'height',
                  value: Number(config.height)
                })" />
            </div>
          </div>
          <!-- / 高 -->

        </a-collapse-panel>
        <!-- E 尺寸 -->

        <!-- E 背景 -->
        <a-collapse-panel header="背景" key="2">

          <div class="comment-template__item">
            <p class="comment-template__leading">颜色:</p>
            <div class="comment-template__inner">
              <ColorPicker
                v-model="config.backgroundColor"
                @change="() =>viewService.next({
                  type: 'backgroundColor',
                  value: config.backgroundColor
                 })" />
            </div>
          </div>
          <!-- / 颜色 -->

        </a-collapse-panel>
        <!-- E 背景 -->

      </a-collapse>

    </div>
    <!-- E 视图配置 -->

  </div>
</template>

<script>
import '@/assets/less/template.less';
import { mapState } from 'vuex';
import _ from 'lodash';
import ViewService from './index';
import ColorPicker from '@/components/colorPicker/index.vue';

export default {
  name: 'ViewConfig',
  components: {
    ColorPicker,
  },
  data: () => ({
    isSubscribed: true,
    config: null,
    viewService: new ViewService(),
  }),
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
