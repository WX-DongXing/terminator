/**
* 折线图配置
* Author: dong xing
* Date: 2019/11/13
* Time: 1:47 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="comment-template">
    <div class="comment-template__header">
      <p class="comment-template__name">折线图</p>
      <a-popconfirm
        title="从视图中删除该部件?"
        placement="left"
        @confirm="() => removeWidget({ widgetId: activeWidget.widgetId })"
        okText="确定"
        cancelText="取消"
      >
        <a-button shape="circle" type="danger" icon="delete" />
      </a-popconfirm>
    </div>
    <div class="lines-config">
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

          <!-- S 专有配置模板 -->
          <ChartProprietaryTemplate ref="chartProprietaryRef">
            <template v-slot:header="{ config }">

              <!-- S 折线图专有配置 -->
              <a-collapse defaultActiveKey="1" :bordered="false">

                <a-collapse-panel header="折线" key="1">

                  <div class="comment-template__item">
                    <p class="comment-template__leading">类型:</p>
                    <div class="comment-template__inner">
                      <a-select
                        v-model="config.proprietaryConfig.lineStyle.type"
                        @change="$refs.chartProprietaryRef.change()">
                        <a-select-option value="solid">直线</a-select-option>
                        <a-select-option value="dashed">虚线</a-select-option>
                        <a-select-option value="dotted">点线</a-select-option>
                      </a-select>
                    </div>
                  </div>
                  <!-- / 类型 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">平滑:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-switch
                        checkedChildren="平滑"
                        unCheckedChildren="正常"
                        v-model="config.proprietaryConfig.smooth"
                        @change="$refs.chartProprietaryRef.change()" />
                    </div>
                  </div>
                  <!-- / 平滑 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">粗细:</p>
                    <div class="comment-template__inner">
                      <a-slider
                        v-model="config.proprietaryConfig.lineStyle.width"
                        @change="$refs.chartProprietaryRef.change()"
                        :min="1"
                        :max="10" />
                    </div>
                  </div>
                  <!-- / 粗细 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">颜色:</p>
                    <div class="comment-template__inner">
                      <ColorPicker
                        v-model="config.proprietaryConfig.lineStyle.color"
                        @change="$refs.chartProprietaryRef.change()"/>
                    </div>
                  </div>
                  <!-- / 颜色 -->

                </a-collapse-panel>
                <!-- / 折线 -->

                <a-collapse-panel header="拐点" key="2">

                  <div class="comment-template__item">
                    <p class="comment-template__leading">显示:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-switch
                        checkedChildren="显示"
                        unCheckedChildren="不显示"
                        v-model="config.proprietaryConfig.showSymbol"
                        @change="$refs.chartProprietaryRef.change()" />
                    </div>
                  </div>
                  <!-- / 显示 -->

                  <div v-if="config.proprietaryConfig.showSymbol">

                    <div class="comment-template__item">
                      <p class="comment-template__leading">形状:</p>
                      <div class="comment-template__inner">
                        <a-select
                          v-model="config.proprietaryConfig.symbol"
                          @change="$refs.chartProprietaryRef.change()">
                          <a-select-option value="none">无</a-select-option>
                          <a-select-option value="emptyCircle">空心圆形</a-select-option>
                          <a-select-option value="circle">圆形</a-select-option>
                          <a-select-option value="rect">矩形</a-select-option>
                          <a-select-option value="roundRect">圆角矩形</a-select-option>
                          <a-select-option value="triangle">三角形</a-select-option>
                          <a-select-option value="diamond">菱形</a-select-option>
                          <a-select-option value="pin">气泡</a-select-option>
                          <a-select-option value="arrow">箭头</a-select-option>
                        </a-select>
                      </div>
                    </div>
                    <!-- / 形状 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">大小:</p>
                      <div class="comment-template__inner">
                        <a-slider
                          v-model="config.proprietaryConfig.symbolSize"
                          @change="$refs.chartProprietaryRef.change()"
                          :min="0"
                          :max="16" />
                      </div>
                    </div>
                    <!-- / 大小 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">旋转角度:</p>
                      <div class="comment-template__inner">
                        <a-slider
                          v-model="config.proprietaryConfig.symbolRotate"
                          @change="$refs.chartProprietaryRef.change()"
                          :min="-90"
                          :max="90" />
                      </div>
                    </div>
                    <!-- / 旋转角度 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">拐点颜色:</p>
                      <div class="comment-template__inner">
                        <ColorPicker
                          v-model="config.proprietaryConfig.itemStyle.color"
                          @change="$refs.chartProprietaryRef.change()"/>
                      </div>
                    </div>
                    <!-- / 拐点颜色 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">描边颜色:</p>
                      <div class="comment-template__inner">
                        <ColorPicker
                          v-model="config.proprietaryConfig.itemStyle.borderColor"
                          @change="$refs.chartProprietaryRef.change()"/>
                      </div>
                    </div>
                    <!-- / 描边颜色 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">描边宽度:</p>
                      <div class="comment-template__inner">
                        <a-slider
                          v-model="config.proprietaryConfig.itemStyle.borderWidth"
                          @change="$refs.chartProprietaryRef.change()"
                          :min="0"
                          :max="10" />
                      </div>
                    </div>
                    <!-- / 描边宽度 -->

                    <div class="comment-template__item">
                      <p class="comment-template__leading">描边类型:</p>
                      <div class="comment-template__inner comment-template__end">
                        <a-radio-group
                          buttonStyle="solid"
                          v-model="config.proprietaryConfig.itemStyle.borderType"
                          @change="$refs.chartProprietaryRef.change()">
                          <a-radio-button value="solid">直线</a-radio-button>
                          <a-radio-button value="dashed">虚线</a-radio-button>
                          <a-radio-button value="dotted">点线</a-radio-button>
                        </a-radio-group>
                      </div>
                    </div>
                    <!-- / 描边类型 -->
                  </div>

                </a-collapse-panel>
                <!-- / 拐点标志 -->

                <a-collapse-panel header="填充样式" key="3">

                  <div class="comment-template__item">
                    <p class="comment-template__leading">显示:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-switch
                        checkedChildren="显示"
                        unCheckedChildren="不显示"
                        v-model="config.proprietaryConfig.areaStyle.show"
                        @change="areaStyleChange(config)" />
                    </div>
                  </div>
                  <!-- / 显示 -->

                  <div v-if="config.proprietaryConfig.areaStyle.show">

                    <div class="comment-template__item">
                      <p class="comment-template__leading">颜色类型:</p>
                      <div class="comment-template__inner comment-template__end">
                        <a-radio-group
                          buttonStyle="solid"
                          v-model="config.proprietaryConfig.areaStyle.colorType"
                          @change="areaStyleChange(config)">
                          <a-radio-button value="single">单一</a-radio-button>
                          <a-radio-button value="linear">线性</a-radio-button>
                        </a-radio-group>
                      </div>
                    </div>
                    <!-- / 颜色类型 -->

                    <div class="comment-template__item" v-if="config.proprietaryConfig.areaStyle.colorType === 'single'">
                      <div class="comment-template__inner">
                        <ColorPicker
                          v-model="config.proprietaryConfig.areaStyle.color"
                          @change="singleColorChange(config)"/>
                      </div>
                    </div>
                    <!-- / 单一区域颜色 -->

                    <div class="comment-template__item" v-if="config.proprietaryConfig.areaStyle.colorType === 'linear'">
                      <div class="comment-template__inner">
                        <LinearColorPicker
                          v-model="config.proprietaryConfig.areaStyle.color"
                          @change="linearColorChange(config)" />
                      </div>
                    </div>
                    <!-- / 渐变区域颜色 -->

                  </div>

                </a-collapse-panel>
                <!-- / 填充样式 -->

              </a-collapse>
              <!-- E 折线图专有配置 -->

            </template>
          </ChartProprietaryTemplate>
          <!-- E 专有配置模板 -->

        </a-tab-pane>

        <a-tab-pane tab="数据配置" key="3">

          <!-- S 数据配置模板 -->
          <DataSourceTemplate />
          <!-- E 数据配置模板 -->

        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import '@/assets/less/template.less'
import { mapState, mapMutations } from 'vuex'
import { ScreenMutations } from '@/store/modules/screen'
import CommonTemplate from '../common/index.vue'
import ChartProprietaryTemplate from '../chartProprietary/index'
import ColorPicker from '@/components/colorPicker/index'
import LinearColorPicker from '@/components/linearColorPicker'
import DataSourceTemplate from '../dataSource/index.vue'

export default {
  name: 'Lines',
  components: {
    CommonTemplate,
    ChartProprietaryTemplate,
    ColorPicker,
    DataSourceTemplate,
    LinearColorPicker
  },
  data: () => ({
    singleColor: 'rgba(7,171,253,1)',
    linearColor: {
      start: 'rgba(255,255,255,1)',
      end: 'rgba(0,0,0,1)'
    }
  }),
  computed: {
    ...mapState('screen', ['activeWidget'])
  },
  methods: {
    ...mapMutations('screen', {
      removeWidget: ScreenMutations.REMOVE_WIDGET
    }),
    /**
     * 单一颜色选择
     * @param config
     */
    singleColorChange (config) {
      this.singleColor = config.proprietaryConfig.areaStyle.color
      this.areaStyleChange(config)
    },
    /**
     * 渐变颜色选择
     * @param config
     */
    linearColorChange (config) {
      this.linearColor = config.proprietaryConfig.areaStyle.color
      this.areaStyleChange(config)
    },
    /**
     * 区域样式更改
     * @param config
     */
    areaStyleChange (config) {
      const color = config.proprietaryConfig.areaStyle.colorType === 'single'
        ? this.singleColor
        : this.linearColor
      Object.assign(config.proprietaryConfig.areaStyle, {
        color
      })
      this.$refs.chartProprietaryRef.change()
    }
  }
}
</script>

<style scoped>
</style>
