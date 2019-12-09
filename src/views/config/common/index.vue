/**
* 通用配置模板
* Author: dong xing
* Date: 2019/11/13
* Time: 1:46 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="common-template">

    <a-collapse defaultActiveKey="1" :bordered="false">

      <!-- S 背景颜色 -->
      <a-collapse-panel header="背景" key="1">

        <div class="comment-template__item">
          <p class="comment-template__leading">颜色:</p>
          <div class="comment-template__inner">
            <ColorPicker
              v-model="config.commonConfig.backgroundColor"
              @change="change('style')" />
          </div>
        </div>
        <!-- / 背景颜色 -->

      </a-collapse-panel>
      <!-- E 背景颜色 -->

      <!-- S 边框 -->
      <a-collapse-panel header="边框" key="2">

        <div class="comment-template__item">
          <p class="comment-template__leading">宽度:</p>
          <div class="comment-template__inner">
            <a-slider
              :min="0"
              :max="16"
              @change="change('style')"
              v-model.number="config.commonConfig.border.width" />
          </div>
        </div>
        <!-- / 宽度 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">颜色:</p>
          <div class="comment-template__inner">
            <ColorPicker
              v-model="config.commonConfig.border.color"
              @change="change('style')" />
          </div>
        </div>
        <!-- / 颜色 -->

      </a-collapse-panel>
      <!-- E 边框 -->

      <!-- S 边距 -->
      <a-collapse-panel header="边距" key="3">

        <div class="comment-template__item">
          <p class="comment-template__leading">上:</p>
          <div class="comment-template__inner">
            <a-input
              type="number"
              min="0"
              v-model.number="config.commonConfig.padding[0]"
              @change="change('style')" />
          </div>
        </div>
        <!-- / 上边距 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">右:</p>
          <div class="comment-template__inner">
            <a-input
              type="number"
              v-model.number="config.commonConfig.padding[1]"
              min="0"
              @change="change('style')" />
          </div>
        </div>
        <!-- / 右边距 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">下:</p>
          <div class="comment-template__inner">
            <a-input
              type="number"
              v-model.number="config.commonConfig.padding[2]"
              min="0"
              @change="change('style')" />
          </div>
        </div>
        <!-- / 下边距 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">左:</p>
          <div class="comment-template__inner">
            <a-input
              type="number"
              v-model.number="config.commonConfig.padding[3]"
              min="0"
              @change="change('style')" />
          </div>
        </div>
        <!-- / 左边距 -->

      </a-collapse-panel>
      <!-- E 边距 -->

      <!-- S 尺寸 -->
      <a-collapse-panel header="尺寸" key="4">

        <div class="comment-template__item">
          <p class="comment-template__leading">宽:</p>
          <div class="comment-template__inner">
            <a-input
              type="number"
              v-model.number="config.commonConfig.width"
              min="0"
              @change="change('size', 'width')" />
          </div>
        </div>
        <!-- / 宽 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">高:</p>
          <div class="comment-template__inner">
            <a-input
              type="number"
              v-model.number="config.commonConfig.height"
              min="0"
              @change="change('size', 'height')" />
          </div>
        </div>
        <!-- / 高 -->

      </a-collapse-panel>
      <!-- E 尺寸 -->

      <!-- S 位置 -->
      <a-collapse-panel header="位置" key="5">

        <div class="comment-template__item">
          <p class="comment-template__leading">X:</p>
          <div class="comment-template__inner">
            <a-input
              type="number"
              v-model.number="config.commonConfig.left"
              min="0"
              @change="change('position')" />
          </div>
        </div>
        <!-- / x坐标位置 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">Y:</p>
          <div class="comment-template__inner">
            <a-input
              type="number"
              v-model.number="config.commonConfig.top"
              min="0"
              @change="change('position')" />
          </div>
        </div>
        <!-- / y坐标位置 -->

      </a-collapse-panel>
      <!-- E 位置 -->

    </a-collapse>

  </div>
</template>

<script>
import '@/assets/less/template.less'
import _ from 'lodash'
import { mapState, mapMutations } from 'vuex'
import { ScreenMutations } from '@/store/modules/screen'
import ColorPicker from '@/components/colorPicker/index.vue'
import AdjustMixins from '@/components/wrapper/AdjustMixins.vue'

export default {
  name: 'CommonTemplate',
  mixins: [AdjustMixins],
  components: {
    ColorPicker
  },
  computed: {
    ...mapState('screen', ['activeWidget', 'view']),
    // 为不修改 state.activeWidget，在此深复制激活部件的配置项，并将其设置为该组件内变量，修改部件后提交再行修改state.activeWidget
    config () {
      return _.cloneDeep(this.activeWidget.config)
    }
  },
  methods: {
    ...mapMutations('screen', {
      activationWidget: ScreenMutations.ACTIVATION_WIDGET
    }),
    // Todo 为实现移动、更改激活部件，设置wrapper选择器事件，有待于重构改部分
    change (type, trigger = null) {
      switch (type) {
        case 'style':
          // 图表样式更改，只需更新数据即可
          this.activeWidget.render.mergeOption(this.config)
          break
        case 'size':
          // 图表尺寸更改，wrapper选择器标准事件流
          const sizePreConfig = _.cloneDeep(this.activeWidget.config.commonConfig)
          const sizeMutation = {
            event: {
              distance: trigger === 'width'
                ? (this.config.commonConfig.width - sizePreConfig.width) * this.view.scale
                : (this.config.commonConfig.height - sizePreConfig.height) * this.view.scale,
              eventType: 'SINGLE',
              mouseType: 'mousemove',
              type: trigger === 'width' ? 'cr' : 'bc'
            },
            originalState: { ...sizePreConfig }
          }
          this.adjust({
            target: document.getElementById(this.activeWidget.widgetId),
            mutation: sizeMutation
          })
          this.adjust({
            target: document.getElementById('wrapper'),
            mutation: sizeMutation
          })
          break
        case 'position':
          // 图表位置更改，wrapper选择器标准事件流
          const positionPreConfig = _.cloneDeep(this.activeWidget.config.commonConfig)
          const positionMutation = {
            event: {
              direction: 'ANY',
              distance: 0,
              eventType: 'MOVE',
              mouseType: 'mousemove',
              position: {
                top: (this.config.commonConfig.top - positionPreConfig.top) * this.view.scale,
                left: (this.config.commonConfig.left - positionPreConfig.left) * this.view.scale
              },
              type: 'move'
            },
            originalState: { ...positionPreConfig }
          }
          this.adjust({
            target: document.getElementById(this.activeWidget.widgetId),
            mutation: positionMutation
          })
          this.adjust({
            target: document.getElementById('wrapper'),
            mutation: positionMutation
          })
          break
        default:
          break
      }
      // 更新部件配置
      const activeWidget = _.cloneDeep(this.activeWidget)
      this.activationWidget({
        widget: Object.assign(activeWidget, {
          config: this.config,
          render: this.activeWidget.render
        })
      })
      // 更新部件后，如果进行尺寸的修改则重新resize图表
      if (type === 'size') {
        this.activeWidget.render.chart.resize()
      }
    }
  }
}
</script>

<style scoped lang="less">
.common-template {
  height: calc(100vh - 224px);
  overflow: auto;
}
</style>
