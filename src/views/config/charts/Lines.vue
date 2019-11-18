/**
* 折线图配置
* Author: dong xing
* Date: 2019/11/13
* Time: 1:47 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="comment-template">
    <p class="comment-template__name">折线图</p>
    <div class="lines-config">
      <a-tabs
        defaultActiveKey="1"
        tabPosition="top"
        :style="{ height: '100%'}"
      >
        <a-tab-pane tab="公共属性" key="1">
          <CommonTemplate :config="activeWidget.config.commonConfig" @change="commonConfigChange" />
        </a-tab-pane>
        <a-tab-pane tab="专有属性" key="2"></a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import '@/assets/less/template.less';
import { mapState, mapMutations } from 'vuex';
import { ScreenMutations } from '@/store/modules/screen';
import CommonTemplate from '../common/index.vue';

export default {
  name: 'Lines',
  components: {
    CommonTemplate,
  },
  computed: {
    ...mapState('screen', ['activeWidget']),
  },
  methods: {
    ...mapMutations('screen', {
      activationWidget: ScreenMutations.ACTIVATION_WIDGET,
    }),
    commonConfigChange(config) {
      Object.assign(this.activeWidget.config.commonConfig, config);
      // 更新部件配置
      this.activationWidget({
        widget: this.activeWidget,
      });
      this.activeWidget.render.mergeOption(this.activeWidget.config);
    },
  },
};
</script>

<style scoped>
.lines-config {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0 12px;
  overflow: auto;
}
</style>
