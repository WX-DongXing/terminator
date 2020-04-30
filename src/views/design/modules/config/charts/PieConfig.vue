/**
* 饼图配置
* Date: 2020/4/27
* Time: 5:30 下午
*/
<template>
  <div class="pie-config">
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
        <ChartProprietaryTemplate>

          <template v-slot:header>

            <a-collapse :bordered="false" defaultActiveKey="1">
              <a-collapse-panel header="玫瑰图" key="1">

                <div class="comment-template__item">
                  <p class="comment-template__leading">玫瑰图:</p>
                  <div class="comment-template__inner">
                    <a-select
                      v-model="config.proprietaryConfig.roseType"
                      @change="change">
                      <a-select-option value="none">无</a-select-option>
                      <a-select-option value="area">圆心角 - 半径</a-select-option>
                      <a-select-option value="radius">半径</a-select-option>
                    </a-select>
                  </div>
                </div>
              <!-- / 南丁格尔 -->

              </a-collapse-panel>
            </a-collapse>
          </template>

          <template>

            <a-collapse :bordered="false">

              <a-collapse-panel header="颜色" key="1" class="visible-collapse-panel">

                <div class="comment-template__item">
                  <p class="comment-template__leading">颜色类型:</p>
                  <div class="comment-template__inner comment-template__end">
                    <a-radio-group
                      buttonStyle="solid"
                      v-model="config.proprietaryConfig.pieItemStyle.type"
                      @change="colorGroupChange(config)">
                      <a-radio-button value="combination">组合</a-radio-button>
                      <a-radio-button value="linear">渐变</a-radio-button>
                    </a-radio-group>
                  </div>
                </div>
                <!-- / 颜色类型 -->

                <div v-if="config.proprietaryConfig.pieItemStyle.type === 'combination'">
                  <div class="comment-template__item">
                    <p class="comment-template__leading">组合类型:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-radio-group
                        buttonStyle="solid"
                        v-model="config.proprietaryConfig.pieItemStyle.colorType"
                        @change="colorGroupChange(config)">
                        <a-radio-button value="default">默认</a-radio-button>
                        <a-radio-button value="custom">自定义</a-radio-button>
                      </a-radio-group>
                    </div>
                  </div>
                  <!-- / 组合类型 -->

                  <div v-if="config.proprietaryConfig.pieItemStyle.colorType === 'default'">
                    <div class="comment-template__item">
                      <p class="comment-template__leading">配色方案:</p>
                      <div class="comment-template__inner comment-template__end">
                        <a-radio-group
                          buttonStyle="solid"
                          v-model="config.proprietaryConfig.pieItemStyle.colorScheme"
                          @change="colorGroupChange(config)">
                          <a-radio-button value="default">默认</a-radio-button>
                          <a-radio-button value="light">亮</a-radio-button>
                          <a-radio-button value="dark">暗</a-radio-button>
                        </a-radio-group>
                      </div>
                    </div>
                    <!-- / 组合类型 -->

                    <div class="comment-template__item pie-config__colors">
                      <span
                        v-for="(color, index)
                          in getColors(config)"
                        :key="index"
                        :style="{ background: color}" />
                    </div>

                  </div>
                  <!-- / 配色方案 -->

                  <div v-if="config.proprietaryConfig.pieItemStyle.colorType === 'custom'">

                    <SingleColorSelector
                      v-model="config.proprietaryConfig.pieItemStyle.color"
                      @change="combinationColorChange(config)" />
                    <!-- / 颜色选择 -->

                  </div>
                  <!-- / 单一颜色自定义 -->

                </div>
                <!-- / 组合颜色 -->

                <div v-if="config.proprietaryConfig.pieItemStyle.type === 'linear'">
                  <div class="comment-template__item">
                    <p class="comment-template__leading">渐变类型:</p>
                    <div class="comment-template__inner comment-template__end">
                      <a-radio-group
                        buttonStyle="solid"
                        v-model="config.proprietaryConfig.pieItemStyle.colorType"
                        @change="colorGroupChange(config)">
                        <a-radio-button value="default">默认</a-radio-button>
                        <a-radio-button value="custom">自定义</a-radio-button>
                      </a-radio-group>
                    </div>
                  </div>
                  <!-- / 渐变类型 -->

                  <div v-if="config.proprietaryConfig.pieItemStyle.colorType === 'default'">
                    <div class="comment-template__item">
                      <p class="comment-template__leading">配色方案:</p>
                      <div class="comment-template__inner comment-template__end">
                        <a-radio-group
                          buttonStyle="solid"
                          v-model="config.proprietaryConfig.pieItemStyle.colorScheme"
                          @change="colorGroupChange(config)">
                          <a-radio-button value="default">默认</a-radio-button>
                          <a-radio-button value="light">亮</a-radio-button>
                          <a-radio-button value="dark">暗</a-radio-button>
                        </a-radio-group>
                      </div>
                    </div>
                    <!-- / 组合类型 -->

                    <div class="comment-template__item pie-config__linear">
                      <span
                        v-for="(color, index)
                          in getColors(config)"
                        :key="index"
                        :style="{
                          background: `linear-gradient(180deg, ${color.start}, ${color.end})`
                        }">
                      </span>
                    </div>

                  </div>
                  <!-- / 配色方案 -->

                  <div v-if="config.proprietaryConfig.pieItemStyle.colorType === 'custom'">

                    <LinearColorSelector
                      v-model="config.proprietaryConfig.pieItemStyle.color"
                      @change="linearColorChange(config)" />
                    <!-- / 颜色选择 -->

                  </div>
                  <!-- / 渐变颜色自定义 -->

                </div>
                <!-- / 渐变颜色 -->

              </a-collapse-panel>
              <!-- / 颜色 -->

              <a-collapse-panel header="半径" key="2">

                <div class="comment-template__item">
                  <p class="comment-template__leading">内半径:</p>
                  <div class="comment-template__inner">
                    <a-input
                      type="text"
                      @change="change"
                      v-model="config.proprietaryConfig.radius.inside" />
                  </div>
                </div>
                <!-- / 内半径 -->

                <div class="comment-template__item">
                  <p class="comment-template__leading">外半径:</p>
                  <div class="comment-template__inner">
                    <a-input
                      type="text"
                      @change="change"
                      v-model="config.proprietaryConfig.radius.outside" />
                  </div>
                </div>
                <!-- / 外半径 -->

              </a-collapse-panel>

            </a-collapse>

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
</template>

<script>
import '@/assets/less/template.less'
import CommonTemplate from '../common/index.vue'
import ChartProprietaryTemplate from '../chartProprietary'
import DataSourceTemplate from '../dataSource'
import ProprietaryMixins from '../proprietaryMixins'
import SingleColorSelector from '@/components/SingleColorSelector'
import LinearColorSelector from '@/components/LinearColorSelector'

export default {
  name: 'PieConfig',
  mixins: [ProprietaryMixins],
  components: {
    CommonTemplate,
    ChartProprietaryTemplate,
    DataSourceTemplate,
    SingleColorSelector,
    LinearColorSelector
  },
  data: () => ({
    combinationColors: [
      {
        type: 'default',
        colors: [
          '#c23531', '#2f4554', '#61a0a8', '#d48265',
          '#91c7ae', '#749f83', '#ca8622', '#bda29a',
          '#6e7074', '#546570', '#c4ccd3'
        ]
      },
      {
        type: 'light',
        colors: [
          '#37a2da', '#32c5e9', '#67e0e3', '#9fe6b8',
          '#ffdb5c', '#ff9f7f', '#fb7293', '#e062ae',
          '#e690d1', '#e7bcf3', '#9d96f5'
        ]
      },
      {
        type: 'dark',
        colors: [
          '#dd6b66', '#759aa0', '#e69d87', '#8dc1a9',
          '#ea7e53', '#eedd78', '#73a373', '#73b9bc',
          '#7289ab', '#91ca8c', '#f49f42'
        ]
      }
    ],
    linearColors: [
      {
        type: 'default',
        colors: [
          { start: '#f3c9c8', end: '#c23531' },
          { start: '#a8b2b9', end: '#2f4554' },
          { start: '#cbe3e6', end: '#61a0a8' },
          { start: '#f5d2c5', end: '#d48265' },
          { start: '#e3f5ec', end: '#91c7ae' },
          { start: '#d6e8dd', end: '#749f83' },
          { start: '#f1dcbd', end: '#ca8622' },
          { start: '#fbe8e2', end: '#bda29a' },
          { start: '#d3d6d8', end: '#6e7074' },
          { start: '#c2d3e0', end: '#6e7074' },
          { start: '#eceff3', end: '#c4ccd3' }
        ]
      },
      {
        type: 'light',
        colors: [
          { start: '#a3dcfb', end: '#37a2da' },
          { start: '#b9f0fd', end: '#32c5e9' },
          { start: '#b0f9fb', end: '#67e0e3' },
          { start: '#d9f9e4', end: '#9fe6b8' },
          { start: '#fbefc8', end: '#ffdb5c' },
          { start: '#ffe4dc', end: '#ff9f7f' },
          { start: '#f7cad5', end: '#fb7293' },
          { start: '#f5c1e0', end: '#e062ae' },
          { start: '#ecd8e8', end: '#e690d1' },
          { start: '#f4ecf7', end: '#e7bcf3' },
          { start: '#f4f3fd', end: '#c4ccd3' }
        ]
      },
      {
        type: 'dark',
        colors: [
          { start: '#e6cbca', end: '#dd6b66' },
          { start: '#bdc6c7', end: '#759aa0' },
          { start: '#eccfc6', end: '#e69d87' },
          { start: '#d6e4de', end: '#8dc1a9' },
          { start: '#fdc9b5', end: '#ea7e53' },
          { start: '#ece8ce', end: '#eedd78' },
          { start: '#b3bfb3', end: '#73a373' },
          { start: '#c2d1d2', end: '#73b9bc' },
          { start: '#cbcfd6', end: '#7289ab' },
          { start: '#d2ded1', end: '#91ca8c' },
          { start: '#f5d1aa', end: '#f49f42' }
        ]
      }
    ],
    combinationCustomColors: [],
    linearCustomColors: [],
    typeMapping: new Map([
      ['combination', 'combinationColors'],
      ['linear', 'linearColors']
    ]),
    customMapping: new Map([
      ['combination', 'combinationCustomColors'],
      ['linear', 'linearCustomColors']
    ])
  }),
  methods: {
    /**
     * 获取配色方案
     * @param config 配置
     * @returns {*}
     */
    getColors (config) {
      const { typeMapping, customMapping } = this
      if (config.proprietaryConfig.pieItemStyle.type === 'single') {
        return this.singleColor
      }

      let color
      if (config.proprietaryConfig.pieItemStyle.colorType === 'custom') {
        color = [...this[customMapping.get(config.proprietaryConfig.pieItemStyle.type)]]
      } else {
        const { colors } = this[typeMapping.get(config.proprietaryConfig.pieItemStyle.type)].find(
          item => item.type === config.proprietaryConfig.pieItemStyle.colorScheme
        )
        color = [...colors]
      }
      return color
    },
    /**
     * 组合颜色选择
     * @param config 配置
     */
    combinationColorChange (config) {
      this.combinationCustomColors = config.proprietaryConfig.pieItemStyle.color
      this.change()
    },
    /**
     * 渐变颜色选择
     * @param config 配置
     */
    linearColorChange (config) {
      this.linearCustomColors = config.proprietaryConfig.pieItemStyle.color
      this.change()
    },
    /**
     * 当颜色类型或者模式更改时，判断此时的颜色
     * @param config
     */
    colorChange (config) {
      Object.assign(config.proprietaryConfig.pieItemStyle, {
        color: this.getColors(config)
      })
    },
    /**
     * 颜色组更改
     * @param config
     */
    colorGroupChange (config) {
      this.colorChange(config)
      this.change()
    }
  }
}
</script>

<style scoped lang="less">
.pie-config {
  &__colors {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-items: center;
    span {
      width: 22px;
      height: 22px;
    }
  }

  &__linear {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-items: center;
    span {
      width: 22px;
      height: 72px;
    }
  }
}
</style>
