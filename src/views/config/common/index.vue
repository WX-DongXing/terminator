/**
* 通用配置
* Author: dong xing
* Date: 2019/11/13
* Time: 1:46 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="common-template" v-if="commonConfig">

    <!-- S 背景颜色 -->
    <p class="comment-template__title">背景</p>
    <div class="comment-template__content">
      <div class="comment-template__item">
        <p class="comment-template__leading">颜色:</p>
        <div class="comment-template__inner">
          <ColorPicker
            v-model="commonConfig.backgroundColor"
            @change="change('style')" />
        </div>
      </div>
    </div>
    <!-- E 背景颜色 -->

    <!-- S 边框 -->
    <p class="comment-template__title">边框</p>
    <div class="comment-template__content">
      <div class="comment-template__item">
        <p class="comment-template__leading">宽度:</p>
        <div class="comment-template__inner">
          <a-input
            type="number"
            min="0" max="10"
            v-model.number="commonConfig.border.width" @change="change('style')" />
        </div>
      </div>
      <!-- / 宽度 -->

      <div class="comment-template__item">
        <p class="comment-template__leading">颜色:</p>
        <div class="comment-template__inner">
          <ColorPicker
            v-model="commonConfig.border.color"
            @change="change('style')" />
        </div>
      </div>
      <!-- / 颜色 -->
    </div>
    <!-- E 边框 -->

    <!-- S 边距 -->
    <p class="comment-template__title">边距</p>
    <div class="comment-template__content">
      <div class="comment-template__item">
        <p class="comment-template__leading">上:</p>
        <div class="comment-template__inner">
          <a-input
            type="number"
            min="0"
            v-model.number="commonConfig.padding[0]"
            @change="change('style')" />
        </div>
      </div>
      <!-- / 上边距 -->

      <div class="comment-template__item">
        <p class="comment-template__leading">右:</p>
        <div class="comment-template__inner">
          <a-input
            type="number"
            v-model.number="commonConfig.padding[1]"
            min="0" @change="change('style')" />
        </div>
      </div>
      <!-- / 右边距 -->

      <div class="comment-template__item">
        <p class="comment-template__leading">下:</p>
        <div class="comment-template__inner">
          <a-input
            type="number"
            v-model.number="commonConfig.padding[2]"
            min="0" @change="change('style')" />
        </div>
      </div>
      <!-- / 下边距 -->

      <div class="comment-template__item">
        <p class="comment-template__leading">左:</p>
        <div class="comment-template__inner">
          <a-input
            type="number"
            v-model.number="commonConfig.padding[3]"
            min="0" @change="change('style')" />
        </div>
      </div>
      <!-- / 左边距 -->
    </div>
    <!-- E 边距 -->

    <!-- S 尺寸 -->
    <p class="comment-template__title">尺寸</p>
    <div class="comment-template__content">
      <div class="comment-template__item">
        <p class="comment-template__leading">宽:</p>
        <div class="comment-template__inner">
          <a-input
            type="number"
            v-model.number="commonConfig.width"
            min="0" @change="change('size', 'width')" />
        </div>
      </div>
      <!-- / 宽 -->

      <div class="comment-template__item">
        <p class="comment-template__leading">高:</p>
        <div class="comment-template__inner">
          <a-input
            type="number"
            v-model.number="commonConfig.height"
            min="0" @change="change('size', 'height')" />
        </div>
      </div>
      <!-- / 高 -->
    </div>
    <!-- E 尺寸 -->

    <!-- S 位置 -->
    <p class="comment-template__title">位置</p>
    <div class="comment-template__content">
      <div class="comment-template__item">
        <p class="comment-template__leading">X:</p>
        <div class="comment-template__inner">
          <a-input
            type="number"
            v-model.number="commonConfig.left"
            min="0" @change="change('position')" />
        </div>
      </div>
      <!-- / x坐标位置 -->

      <div class="comment-template__item">
        <p class="comment-template__leading">Y:</p>
        <div class="comment-template__inner">
          <a-input
            type="number"
            v-model.number="commonConfig.top"
            min="0" @change="change('position')" />
        </div>
      </div>
      <!-- / y坐标位置 -->
    </div>
    <!-- E 位置 -->

  </div>
</template>

<script>
import '@/assets/less/template.less';
import _ from 'lodash';
import { mapState, mapMutations } from 'vuex';
import { ScreenMutations } from '@/store/modules/screen';
import ColorPicker from '@/components/colorPicker/index.vue';
import AdjustMixins from '@/components/wrapper/AdjustMixins.vue';

export default {
  name: 'CommonTemplate',
  mixins: [AdjustMixins],
  components: {
    ColorPicker,
  },
  data: () => ({
  }),
  computed: {
    ...mapState('screen', ['activeWidget', 'view']),
    // 为不修改 state.activeWidget，在此深复制激活部件的配置项，并将其设置为该组件内变量，修改部件后提交再行修改state.activeWidget
    commonConfig() {
      return _.cloneDeep(this.activeWidget.config.commonConfig);
    },
  },
  methods: {
    ...mapMutations('screen', {
      activationWidget: ScreenMutations.ACTIVATION_WIDGET,
    }),
    // Todo 为实现移动、更改激活部件，设置wrapper选择器事件，有待于重构改部分
    change(type, trigger = null) {
      switch (type) {
        case 'style':
          // 图表样式更改，只需更新数据即可
          Object.assign(this.activeWidget.config.commonConfig, this.commonConfig);
          this.activeWidget.render.mergeOption(this.activeWidget.config);
          break;
        case 'size':
          // 图表尺寸更改，wrapper选择器标准事件流
          // eslint-disable-next-line no-case-declarations
          const sizePreConfig = _.cloneDeep(this.activeWidget.config.commonConfig);
          // eslint-disable-next-line no-case-declarations
          const sizeMutation = {
            event: {
              distance: trigger === 'width'
                ? (this.commonConfig.width - sizePreConfig.width) * this.view.scale
                : (this.commonConfig.height - sizePreConfig.height) * this.view.scale,
              eventType: 'SINGLE',
              mouseType: 'mousemove',
              type: trigger === 'width' ? 'cr' : 'bc',
            },
            originalState: { ...sizePreConfig },
          };
          this.adjust({
            target: document.getElementById(this.activeWidget.widgetId),
            mutation: sizeMutation,
          });
          this.adjust({
            target: document.getElementById('wrapper'),
            mutation: sizeMutation,
          });
          Object.assign(this.activeWidget.config.commonConfig, this.commonConfig);
          this.activeWidget.render.chart.resize();
          break;
        case 'position':
          // 图表位置更改，wrapper选择器标准事件流
          // eslint-disable-next-line no-case-declarations
          const positionPreConfig = _.cloneDeep(this.activeWidget.config.commonConfig);
          // eslint-disable-next-line no-case-declarations
          const positionMutation = {
            event: {
              direction: 'ANY',
              distance: 0,
              eventType: 'MOVE',
              mouseType: 'mousemove',
              position: {
                top: (this.commonConfig.top - positionPreConfig.top) * this.view.scale,
                left: (this.commonConfig.left - positionPreConfig.left) * this.view.scale,
              },
              type: 'move',
            },
            originalState: { ...positionPreConfig },
          };
          this.adjust({
            target: document.getElementById(this.activeWidget.widgetId),
            mutation: positionMutation,
          });
          this.adjust({
            target: document.getElementById('wrapper'),
            mutation: positionMutation,
          });
          Object.assign(this.activeWidget.config.commonConfig, this.commonConfig);
          break;
        default:
          break;
      }
      // 更新部件配置
      // todo 由于目前的设计下可以不通过mutation修改激活的部件，故此部分或可取消，有待重构该部分
      this.activationWidget({
        widget: this.activeWidget,
      });
    },
  },
};
</script>

<style scoped>
.common-template {
  height: calc(100vh - 224px);
  overflow: auto;
}
</style>
