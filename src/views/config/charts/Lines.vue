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
            <template v-slot="{ config }">

              <!-- S 折线图专有配置 -->
              <p class="comment-template__title">折线</p>
              <div class="comment-template__content">
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
                  <div class="comment-template__inner">
                    <a-select
                      v-model="config.proprietaryConfig.smooth"
                      @change="$refs.chartProprietaryRef.change()">
                      <a-select-option :value="0">正常</a-select-option>
                      <a-select-option :value="1">平滑</a-select-option>
                    </a-select>
                  </div>
                </div>
                <!-- / 平滑 -->

                <div class="comment-template__item">
                  <p class="comment-template__leading">粗细:</p>
                  <div class="comment-template__inner">
                    <a-slider
                      v-model="config.proprietaryConfig.lineStyle.width"
                      @change="$refs.chartProprietaryRef.change()" :min="1" :max="10" />
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

              </div>
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
import '@/assets/less/template.less';
import { mapState, mapMutations } from 'vuex';
import { ScreenMutations } from '@/store/modules/screen';
import CommonTemplate from '../common/index.vue';
import ChartProprietaryTemplate from '../chartProprietary/index.vue';
import ColorPicker from '@/components/colorPicker/index.vue';
import DataSourceTemplate from '../dataSource/index.vue';

export default {
  name: 'Lines',
  components: {
    CommonTemplate,
    ChartProprietaryTemplate,
    ColorPicker,
    DataSourceTemplate,
  },
  computed: {
    ...mapState('screen', ['activeWidget']),
  },
  methods: {
    ...mapMutations('screen', {
      removeWidget: ScreenMutations.REMOVE_WIDGET,
    }),
  },
};
</script>

<style scoped>
</style>
