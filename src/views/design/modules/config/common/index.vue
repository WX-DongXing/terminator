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
          <p class="comment-template__leading">颜色模式:</p>
          <div class="comment-template__inner comment-template__end">
            <a-radio-group
              buttonStyle="solid"
              v-model="config.commonConfig.colorMode"
              @change="colorModeChange(config)">
              <a-radio-button value="single">单一</a-radio-button>
              <a-radio-button value="linear">线性</a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <!-- / 颜色模式 -->

        <div class="comment-template__item" v-if="config.commonConfig.colorMode === 'single'">
          <div class="comment-template__inner">
            <ColorPicker
              v-model="config.commonConfig.backgroundColor"
              @change="singleColorChange(config)" />
          </div>
        </div>
        <!-- / 背景颜色 -->

        <div class="comment-template__item" v-if="config.commonConfig.colorMode === 'linear'">
          <div class="comment-template__inner">
            <LinearColorPicker
              show-angle
              v-model="config.commonConfig.backgroundColor"
              @change="linearColorChange(config)" />
          </div>
        </div>
        <!-- / 背景颜色 -->

      </a-collapse-panel>
      <!-- E 背景颜色 -->

      <!-- S 边框 -->
      <a-collapse-panel header="边框" key="2">

        <div class="comment-template__item">
          <p class="comment-template__leading">类型:</p>
          <div class="comment-template__inner comment-template__end">
            <a-radio-group
              buttonStyle="solid"
              v-model="config.commonConfig.border.borderStyle"
              @change="change('native')">
              <a-radio-button value="solid">直线</a-radio-button>
              <a-radio-button value="dashed">折线</a-radio-button>
              <a-radio-button value="dotted">点线</a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <!-- / 类型 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">宽度:</p>
          <div class="comment-template__inner">
            <a-slider
              :min="0"
              :max="48"
              @change="change('native')"
              v-model.number="config.commonConfig.border.borderWidth" />
          </div>
        </div>
        <!-- / 宽度 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">颜色:</p>
          <div class="comment-template__inner">
            <ColorPicker
              v-model="config.commonConfig.border.borderColor"
              @change="change('native')" />
          </div>
        </div>
        <!-- / 颜色 -->

      </a-collapse-panel>
      <!-- E 边框 -->

      <!-- S 圆角 -->
      <a-collapse-panel header="圆角" key="3">

        <div class="comment-template__item">
          <p class="comment-template__leading">左上:</p>
          <div class="comment-template__inner">
            <a-input
              type="number"
              min="0"
              v-model.number="config.commonConfig.border.borderRadius.borderTopLeftRadius"
              @change="change('native')" />
          </div>
        </div>
        <!-- / 左上圆角 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">右上:</p>
          <div class="comment-template__inner">
            <a-input
              type="number"
              v-model.number="config.commonConfig.border.borderRadius.borderTopRightRadius"
              min="0"
              @change="change('native')" />
          </div>
        </div>
        <!-- / 右上圆角 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">右下:</p>
          <div class="comment-template__inner">
            <a-input
              type="number"
              v-model.number="config.commonConfig.border.borderRadius.borderBottomRightRadius"
              min="0"
              @change="change('native')" />
          </div>
        </div>
        <!-- / 右下圆角 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">左下:</p>
          <div class="comment-template__inner">
            <a-input
              type="number"
              v-model.number="config.commonConfig.border.borderRadius.borderBottomLeftRadius"
              min="0"
              @change="change('native')" />
          </div>
        </div>
        <!-- / 左下圆角 -->

      </a-collapse-panel>
      <!-- E 圆角 -->

      <!-- S 边距 -->
      <a-collapse-panel header="边距" key="4">

        <div class="comment-template__item">
          <p class="comment-template__leading">上:</p>
          <div class="comment-template__inner">
            <a-input
              type="number"
              min="0"
              v-model.number="config.commonConfig.padding[0]"
              @change="change('padding')" />
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
              @change="change('padding')" />
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
              @change="change('padding')" />
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
              @change="change('padding')" />
          </div>
        </div>
        <!-- / 左边距 -->

      </a-collapse-panel>
      <!-- E 边距 -->

      <!-- S 尺寸 -->
      <a-collapse-panel header="尺寸" key="5">

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
      <a-collapse-panel header="位置" key="6">

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
import { mapState, mapGetters, mapMutations } from 'vuex'
import { ScreenMutations } from '@/store/modules/screen'
import ColorPicker from '@/components/ColorPicker'
import LinearColorPicker from '@/components/LinearColorPicker'
import AdjustMixins from '@/components/Wrapper/AdjustMixins'

export default {
  name: 'CommonTemplate',
  mixins: [AdjustMixins],
  components: {
    ColorPicker,
    LinearColorPicker
  },
  data: () => ({
    singleColor: 'rgba(255, 255, 255, 1)',
    linearColor: {
      start: 'rgba(255, 255, 255, 1)',
      end: 'rgba(0, 0, 0, 1)',
      angle: 180
    }
  }),
  computed: {
    ...mapState('screen', [
      'activeWidget'
    ]),
    ...mapGetters('screen', ['scale']),
    // 为不修改 state.activeWidget，在此深复制激活部件的配置项，并将其设置为该组件内变量，修改部件后提交再行修改state.activeWidget
    config () {
      return _.cloneDeep(this.activeWidget.config)
    }
  },
  methods: {
    ...mapMutations('screen', {
      activateWidget: ScreenMutations.ACTIVATE_WIDGET,
      removeWidget: ScreenMutations.REMOVE_WIDGET
    }),
    /**
     * 单一颜色更改
     * @param config 配置
     */
    singleColorChange ({ commonConfig: { backgroundColor } }) {
      this.singleColor = backgroundColor
      this.change('native')
    },
    /**
     * 渐变颜色更改
     * @param config 配置
     */
    linearColorChange ({ commonConfig: { backgroundColor } }) {
      this.linearColor = backgroundColor
      this.change('native')
    },
    /**
     * 颜色模式更改
     */
    colorModeChange (config) {
      const backgroundColor = config.commonConfig.colorMode === 'single'
        ? this.singleColor
        : this.linearColor
      Object.assign(this.config.commonConfig, { backgroundColor })
      this.change('native')
    },
    // Todo 为实现移动、更改激活部件，设置wrapper选择器事件，有待于重构该部分
    change (type, trigger = null) {
      switch (type) {
        case 'native':
          const { render } = this.activeWidget
          render.setStyle(this.config)
          break
        case 'padding':
          // 图表Padding样式更改，只需更新数据即可
          this.activeWidget.render.mergeOption(this.config)
          break
        case 'size':
          // 图表尺寸更改，wrapper选择器标准事件流
          const sizePreConfig = _.cloneDeep(this.activeWidget.config.commonConfig)
          const sizeMutation = {
            event: {
              distance: trigger === 'width'
                ? (this.config.commonConfig.width - sizePreConfig.width) * this.scale
                : (this.config.commonConfig.height - sizePreConfig.height) * this.scale,
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
                top: (this.config.commonConfig.top - positionPreConfig.top) * this.scale,
                left: (this.config.commonConfig.left - positionPreConfig.left) * this.scale
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
      this.updateActiveWidget()

      // 更新部件后，如果进行尺寸的修改则重新resize图表
      if (type === 'size') {
        this.activeWidget.render.resize(this.activeWidget.config)
      }
    },
    /**
     * 更新部件配置
     */
    updateActiveWidget () {
      const activeWidget = _.cloneDeep(this.activeWidget)
      this.activateWidget({
        widget: Object.assign(activeWidget, {
          config: this.config,
          render: this.activeWidget.render
        })
      })
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
