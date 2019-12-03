/**
* 图标专有配置模板
* Author: dong xing
* Date: 2019/11/25
* Time: 3:54 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="chart-proprietary-template">

    <p class="comment-template__title">图例</p>
    <div class="comment-template__content">
      <div class="comment-template__item">
        <p class="comment-template__leading">显示:</p>
        <div class="comment-template__inner">
          <a-select
            v-model="config.proprietaryConfig.legend.show"
            @change="change">
            <a-select-option :value="1">显示</a-select-option>
            <a-select-option :value="0">不显示</a-select-option>
          </a-select>
        </div>
      </div>
      <!-- / 显示 -->

      <div v-if="config.proprietaryConfig.legend.show">
        <div class="comment-template__item">
          <p class="comment-template__leading">方向:</p>
          <div class="comment-template__inner">
            <a-select
              v-model="config.proprietaryConfig.legend.orient"
              @change="change">
              <a-select-option value="horizontal">水平</a-select-option>
              <a-select-option value="vertical">纵向</a-select-option>
            </a-select>
          </div>
        </div>
        <!-- / 方向 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">居上:</p>
          <div class="comment-template__inner">
            <a-input
              type="text" @change="change"
              v-model="config.proprietaryConfig.legend.top" />
          </div>
        </div>
        <!-- / 居上 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">居右:</p>
          <div class="comment-template__inner">
            <a-input
              type="text" @change="change"
              v-model="config.proprietaryConfig.legend.right" />
          </div>
        </div>
        <!-- / 居右 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">居下:</p>
          <div class="comment-template__inner">
            <a-input
              type="text" @change="change"
              v-model="config.proprietaryConfig.legend.bottom" />
          </div>
        </div>
        <!-- / 居下 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">居左:</p>
          <div class="comment-template__inner">
            <a-input
              type="text" @change="change"
              v-model="config.proprietaryConfig.legend.left" />
          </div>
        </div>
        <!-- / 居左 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">图标:</p>
          <div class="comment-template__inner">
            <a-select
              v-model="config.proprietaryConfig.legend.icon"
              @change="change">
              <a-select-option
                v-for="icon in icons"
                :key="icon.value"
                :value="icon.value">
                {{icon.name}}
              </a-select-option>
            </a-select>
          </div>
        </div>
        <!-- / 方向 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">颜色:</p>
          <div class="comment-template__inner">
            <ColorPicker
              v-model="config.proprietaryConfig.legend.textStyle.color"
              @change="change" />
          </div>
        </div>
        <!-- / 文字颜色 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">粗细:</p>
          <div class="comment-template__inner">
            <a-select
              v-model="config.proprietaryConfig.legend.textStyle.fontWeight"
              @change="change">
              <a-select-option value="normal">正常</a-select-option>
              <a-select-option value="lighter">细</a-select-option>
              <a-select-option value="bold">粗</a-select-option>
              <a-select-option value="bolder">更粗</a-select-option>
            </a-select>
          </div>
        </div>
        <!-- / 文字粗细 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">大小:</p>
          <div class="comment-template__inner">
            <a-slider
              :min="6" :max="24" @change="change"
              v-model="config.proprietaryConfig.legend.textStyle.fontSize" />
          </div>
        </div>
        <!-- / 粗细 -->
      </div>

    </div>
    <!-- E 折线图专有配置 -->

    <slot :config="config" />

  </div>
</template>

<script>
import '@/assets/less/template.less';
import _ from 'lodash';
import { mapState, mapMutations } from 'vuex';
import { ScreenMutations } from '@/store/modules/screen';
import ColorPicker from '@/components/colorPicker/index.vue';

export default {
  name: 'ChartProprietaryTemplate',
  components: {
    ColorPicker,
  },
  data: () => ({
    icons: [
      { name: '圆点', value: 'circle' },
      { name: '矩形', value: 'rect' },
      { name: '圆角矩形', value: 'roundRect' },
      { name: '三角形', value: 'triangle' },
      { name: '菱形', value: 'diamond' },
    ],
  }),
  computed: {
    ...mapState('screen', ['activeWidget']),
    config() {
      return _.cloneDeep(this.activeWidget.config);
    },
  },
  methods: {
    ...mapMutations('screen', {
      activationWidget: ScreenMutations.ACTIVATION_WIDGET,
      removeWidget: ScreenMutations.REMOVE_WIDGET,
    }),
    change() {
      const activeWidget = _.cloneDeep(this.activeWidget);
      const { render } = this.activeWidget;
      Object.assign(activeWidget.config, this.config);
      this.activationWidget({
        widget: Object.assign(activeWidget, { render }),
      });
      this.$nextTick(() => {
        render.mergeOption(this.config);
      });
    },
  },
};
</script>

<style scoped lang="less">
.chart-proprietary-template {
  height: calc(100vh - 224px);
  overflow: auto;
  box-sizing: border-box;
  padding: 0 12px;
}
</style>
