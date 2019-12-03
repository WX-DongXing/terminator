/**
* 柱形图配置
* Author: dong xing
* Date: 2019/11/13
* Time: 2:59 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="comment-template">
    <div class="comment-template__header">
      <p class="comment-template__name">柱形图</p>
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
    <div class="bar-config">
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
            <template v-slot="{ config }">

              <p class="comment-template__title">颜色</p>
              <div class="comment-template__content">
                <div class="comment-template__item">
                  <p class="comment-template__leading">颜色类型:</p>
                  <div class="comment-template__inner">
                    <a-select
                      v-model="config.proprietaryConfig.itemStyle.type"
                      @change="typeChange(config)">
                      <a-select-option value="single">单一</a-select-option>
                      <a-select-option value="combination">组合</a-select-option>
                      <a-select-option value="linear">渐变</a-select-option>
                    </a-select>
                  </div>
                </div>
                <!-- / 颜色类型 -->

                <div class="comment-template__item"
                     v-if="config.proprietaryConfig.itemStyle.type === 'single'">
                  <p class="comment-template__leading">单一颜色:</p>
                  <div class="comment-template__inner">
                    <ColorPicker
                      v-model="config.proprietaryConfig.itemStyle.color"
                      @change="$refs.chartProprietaryRef.change()"/>
                  </div>
                </div>
                <!-- / 单一颜色 -->

                <div v-if="config.proprietaryConfig.itemStyle.type === 'combination'">
                  <div class="comment-template__item">
                    <p class="comment-template__leading">组合类型:</p>
                    <div class="comment-template__inner">
                      <a-select
                        v-model="config.proprietaryConfig.itemStyle.colorType"
                        @change="colorTypeChange(config)">
                        <a-select-option value="default">默认</a-select-option>
                        <a-select-option value="custom">自定义</a-select-option>
                      </a-select>
                    </div>
                  </div>
                  <!-- / 组合类型 -->

                  <div v-if="config.proprietaryConfig.itemStyle.colorType === 'default'">
                    <div class="comment-template__item">
                      <p class="comment-template__leading">配色方案:</p>
                      <div class="comment-template__inner">
                        <a-select
                          v-model="config.proprietaryConfig.itemStyle.colorScheme"
                          @change="$refs.chartProprietaryRef.change()">
                          <a-select-option value="default">默认</a-select-option>
                          <a-select-option value="light">亮</a-select-option>
                          <a-select-option value="dark">暗</a-select-option>
                        </a-select>
                      </div>
                    </div>
                    <!-- / 组合类型 -->

                    <div class="comment-template__item bar-config__colors">
                      <span
                        v-for="(color, index)
                        in getColors(config)"
                        :key="index"
                        :style="{ background: color}"></span>
                    </div>

                  </div>
                  <!-- / 配色方案 -->

                  <div v-if="config.proprietaryConfig.itemStyle.colorType === 'custom'">

                    <SingleColorSelector
                      v-model="combinationCustomColors"
                      @change="customColors(config)" />
                    <!-- / 颜色选择 -->

                  </div>
                  <!-- / 单一颜色自定义 -->

                </div>
                <!-- / 组合颜色 -->

                <div v-if="config.proprietaryConfig.itemStyle.type === 'linear'">
                  <div class="comment-template__item">
                    <p class="comment-template__leading">渐变类型:</p>
                    <div class="comment-template__inner">
                      <a-select
                        v-model="config.proprietaryConfig.itemStyle.colorType"
                        @change="colorTypeChange(config)">
                        <a-select-option value="default">默认</a-select-option>
                        <a-select-option value="custom">自定义</a-select-option>
                      </a-select>
                    </div>
                  </div>
                  <!-- / 渐变类型 -->

                  <div v-if="config.proprietaryConfig.itemStyle.colorType === 'default'">
                    <div class="comment-template__item">
                      <p class="comment-template__leading">配色方案:</p>
                      <div class="comment-template__inner">
                        <a-select
                          v-model="config.proprietaryConfig.itemStyle.colorScheme"
                          @change="$refs.chartProprietaryRef.change()">
                          <a-select-option value="default">默认</a-select-option>
                          <a-select-option value="light">亮</a-select-option>
                          <a-select-option value="dark">暗</a-select-option>
                        </a-select>
                      </div>
                    </div>
                    <!-- / 组合类型 -->

                    <div class="comment-template__item bar-config__linear">
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

                  <div v-if="config.proprietaryConfig.itemStyle.colorType === 'custom'">

                    <LinearColorSelector
                      v-model="linearCustomColors"
                      @change="customColors(config)" />
                    <!-- / 颜色选择 -->

                  </div>
                  <!-- / 渐变颜色自定义 -->

                </div>
                <!-- / 渐变颜色 -->

              </div>
              <!-- / 颜色 -->

              <p class="comment-template__title">图形</p>
              <div class="comment-template__content">

                <div class="comment-template__item">
                  <p class="comment-template__leading">柱条宽度:</p>
                  <div class="comment-template__inner">
                    <a-select
                      v-model="config.proprietaryConfig.barWidthType"
                      @change="barWidthTypeChange(config)">
                      <a-select-option value="auto">自适应</a-select-option>
                      <a-select-option value="custom">自定义</a-select-option>
                    </a-select>
                  </div>
                </div>
                <!-- / 柱条宽度 -->

                <div class="comment-template__item"
                  v-if="config.proprietaryConfig.barWidthType === 'custom'"
                >
                  <p class="comment-template__leading">自定宽度:</p>
                  <div class="comment-template__inner">
                    <a-input
                      type="number" min="12" max="100"
                      @change="$refs.chartProprietaryRef.change()"
                      v-model.number="config.proprietaryConfig.barWidth" />
                  </div>
                </div>
                <!-- / 柱条宽度 -->

              </div>
              <!-- / 图形 -->

              <p class="comment-template__title">圆角</p>
              <div class="comment-template__content">

                <div class="comment-template__item">
                  <p class="comment-template__leading">左上:</p>
                  <div class="comment-template__inner">
                    <a-input
                      type="number" min="0" max="100"
                      @change="$refs.chartProprietaryRef.change()"
                      v-model.number="config.proprietaryConfig.itemStyle.barBorderRadius[0]" />
                  </div>
                </div>
                <!-- / 左上圆角 -->

                <div class="comment-template__item">
                  <p class="comment-template__leading">右上:</p>
                  <div class="comment-template__inner">
                    <a-input
                      type="number" min="0" max="100"
                      @change="$refs.chartProprietaryRef.change()"
                      v-model.number="config.proprietaryConfig.itemStyle.barBorderRadius[1]" />
                  </div>
                </div>
                <!-- / 左上圆角 -->

                <div class="comment-template__item">
                  <p class="comment-template__leading">右下:</p>
                  <div class="comment-template__inner">
                    <a-input
                      type="number" min="0" max="100"
                      @change="$refs.chartProprietaryRef.change()"
                      v-model.number="config.proprietaryConfig.itemStyle.barBorderRadius[2]" />
                  </div>
                </div>
                <!-- / 左上圆角 -->

                <div class="comment-template__item">
                  <p class="comment-template__leading">左下:</p>
                  <div class="comment-template__inner">
                    <a-input
                      type="number" min="0" max="100"
                      @change="$refs.chartProprietaryRef.change()"
                      v-model.number="config.proprietaryConfig.itemStyle.barBorderRadius[3]" />
                  </div>
                </div>
                <!-- / 左上圆角 -->

              </div>
              <!-- / 圆角 -->

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
import '@/assets/less/template.less';
import { mapState, mapMutations } from 'vuex';
import { ScreenMutations } from '@/store/modules/screen';
import CommonTemplate from '../common/index.vue';
import ChartProprietaryTemplate from '../chartProprietary/index.vue';
import ColorPicker from '@/components/colorPicker/index.vue';
import DataSourceTemplate from '../dataSource/index.vue';
import SingleColorSelector from '@/components/singleColorSelector/index.vue';
import LinearColorSelector from '@/components/linearColorSelector/index.vue';

export default {
  name: 'Bar',
  components: {
    CommonTemplate,
    ChartProprietaryTemplate,
    ColorPicker,
    DataSourceTemplate,
    SingleColorSelector,
    LinearColorSelector,
  },
  data: () => ({
    combinationColors: [
      {
        type: 'default',
        colors: [
          '#c23531', '#2f4554', '#61a0a8', '#d48265',
          '#91c7ae', '#749f83', '#ca8622', '#bda29a',
          '#6e7074', '#546570', '#c4ccd3',
        ],
      },
      {
        type: 'light',
        colors: [
          '#37a2da', '#32c5e9', '#67e0e3', '#9fe6b8',
          '#ffdb5c', '#ff9f7f', '#fb7293', '#e062ae',
          '#e690d1', '#e7bcf3', '#9d96f5',
        ],
      },
      {
        type: 'dark',
        colors: [
          '#dd6b66', '#759aa0', '#e69d87', '#8dc1a9',
          '#ea7e53', '#eedd78', '#73a373', '#73b9bc',
          '#7289ab', '#91ca8c', '#f49f42',
        ],
      },
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
          { start: '#eceff3', end: '#c4ccd3' },
        ],
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
          { start: '#f4f3fd', end: '#c4ccd3' },
        ],
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
          { start: '#f5d1aa', end: '#f49f42' },
        ],
      },
    ],
    combinationCustomColors: [],
    linearCustomColors: [],
    typeMapping: new Map([
      ['combination', 'combinationColors'],
      ['linear', 'linearColors'],
    ]),
    customMapping: new Map([
      ['combination', 'combinationCustomColors'],
      ['linear', 'linearCustomColors'],
    ]),
  }),
  computed: {
    ...mapState('screen', ['activeWidget']),
  },
  methods: {
    ...mapMutations('screen', {
      removeWidget: ScreenMutations.REMOVE_WIDGET,
    }),
    /**
     * 类型更改
     */
    typeChange(config) {
      Object.assign(config.proprietaryConfig.itemStyle, {
        color: config.proprietaryConfig.itemStyle.type === 'single'
          ? 'rgba(7,171,253,1)'
          : [],
      });
      this.$refs.chartProprietaryRef.change();
    },
    /**
     * 颜色类型更改
     * @param config 配置
     */
    colorTypeChange(config) {
      Object.assign(config.proprietaryConfig.itemStyle, {
        color: config.proprietaryConfig.itemStyle.color || [],
      });
      this.$refs.chartProprietaryRef.change();
    },
    /**
     * 获取配色方案
     * @param config 配置
     * @returns {*}
     */
    getColors(config) {
      const { typeMapping } = this;
      const { colors } = this[typeMapping.get(config.proprietaryConfig.itemStyle.type)].find(
        item => item.type === config.proprietaryConfig.itemStyle.colorScheme,
      );
      Object.assign(config.proprietaryConfig.itemStyle, {
        color: [...colors],
      });
      return colors;
    },
    /**
     * 自定义颜色
     * @param config
     */
    customColors(config) {
      const { customMapping } = this;
      Object.assign(config.proprietaryConfig.itemStyle, {
        color: [...this[customMapping.get(config.proprietaryConfig.itemStyle.type)]],
      });
      this.$refs.chartProprietaryRef.change();
    },
    /**
     * 柱条宽度类型更改
     * @param config 配置
     */
    barWidthTypeChange(config) {
      Object.assign(config.proprietaryConfig, {
        barWidth: config.proprietaryConfig.barWidthType === 'custom'
          ? 12
          : 'auto',
      });
      this.$refs.chartProprietaryRef.change();
    },
  },
};
</script>

<style scoped lang="less">
.bar-config {
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
