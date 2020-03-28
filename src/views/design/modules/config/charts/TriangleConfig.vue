/**
* 三角形配置面板
* Author: dong xing
* Date: 2020/3/24
* Time: 16:40
* Email: dong.xing@outlook.com
*/

<template>
  <div class="triangle-config">
    <a-tabs
      defaultActiveKey="1"
      tabPosition="top"
      :style="{ height: '100%'}"
    >
      <a-tab-pane tab="公共属性" key="1">

        <!-- S 公共配置模板 -->
        <CommonTemplate />
        <!-- E 公共配置模板 -->

      </a-tab-pane>

      <a-tab-pane tab="专有属性" key="2">
        <div class="triangle-config__template">
          <a-collapse defaultActiveKey="1" :bordered="false">

            <!-- S 样式 -->
            <a-collapse-panel header="样式" key="1">

              <div class="comment-template__item">
                <p class="comment-template__leading">颜色模式:</p>
                <div class="comment-template__inner comment-template__end">
                  <a-radio-group
                    buttonStyle="solid"
                    v-model="config.proprietaryConfig.graphic.style.colorMode"
                    @change="colorModeChange(config)">
                    <a-radio-button value="single">单一</a-radio-button>
                    <a-radio-button value="linear">线性</a-radio-button>
                  </a-radio-group>
                </div>
              </div>
              <!-- / 颜色模式 -->

              <div class="comment-template__item" v-if="config.proprietaryConfig.graphic.style.colorMode === 'single'">
                <div class="comment-template__inner">
                  <ColorPicker
                    v-model="config.proprietaryConfig.graphic.style.fill"
                    @change="singleColorChange(config)" />
                </div>
              </div>
              <!-- / 单一填充颜色 -->

              <div class="comment-template__item" v-if="config.proprietaryConfig.graphic.style.colorMode === 'linear'">
                <div class="comment-template__inner">
                  <LinearColorPicker
                    v-model="config.proprietaryConfig.graphic.style.fill"
                    @change="linearColorChange(config)" />
                </div>
              </div>
              <!-- / 线性填充颜色 -->

              <div class="comment-template__item">
                <p class="comment-template__leading">边框颜色:</p>
                <div class="comment-template__inner">
                  <ColorPicker
                    v-model="config.proprietaryConfig.graphic.style.stroke"
                    @change="change" />
                </div>
              </div>
              <!-- / 边框颜色 -->

              <div class="comment-template__item">
                <p class="comment-template__leading">内边框:</p>
                <div class="comment-template__inner">
                  <a-slider
                    :min="0"
                    :max="48"
                    @change="change"
                    v-model.number="config.proprietaryConfig.graphic.style.lineWidth" />
                </div>
              </div>
              <!-- / 内边框 -->

              <div class="comment-template__item">
                <p class="comment-template__leading">平滑:</p>
                <div class="comment-template__inner">
                  <a-slider
                    :min="0"
                    :max="1"
                    :step="0.01"
                    @change="change"
                    v-model.number="config.proprietaryConfig.graphic.shape.smooth" />
                </div>
              </div>
              <!-- / 平滑 -->

            </a-collapse-panel>
            <!-- E 样式 -->

          </a-collapse>
        </div>
      </a-tab-pane>

    </a-tabs>
  </div>
</template>

<script>
import '@/assets/less/template.less'
import CommonTemplate from '../common'
import ProprietaryMixins from '../proprietaryMixins'
import ColorPicker from '@/components/ColorPicker'
import LinearColorPicker from '@/components/LinearColorPicker'

export default {
  name: 'TriangleConfig',
  mixins: [ProprietaryMixins],
  components: {
    CommonTemplate,
    ColorPicker,
    LinearColorPicker
  },
  data: () => ({
    singleColor: 'rgba(64,169,255, 1)',
    linearColor: {
      start: 'rgba(64,169,255, 1)',
      end: 'rgba(255, 255, 255, 1)'
    }
  }),
  methods: {
    /**
     * 单一颜色更改
     * @param config 配置
     */
    singleColorChange ({ proprietaryConfig: { graphic: { style: { fill } } } }) {
      this.singleColor = fill
      this.change()
    },
    /**
     * 渐变颜色更改
     * @param config 配置
     */
    linearColorChange ({ proprietaryConfig: { graphic: { style: { fill } } } }) {
      this.linearColor = fill
      this.change()
    },
    /**
     * 颜色模式更改
     */
    colorModeChange (config) {
      const fill = config.proprietaryConfig.graphic.style.colorMode === 'single'
        ? this.singleColor
        : this.linearColor
      Object.assign(this.config.proprietaryConfig.graphic.style, { fill })
      this.change()
    }
  }
}
</script>

<style scoped>

</style>
