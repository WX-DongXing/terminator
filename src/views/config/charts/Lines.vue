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
          <CommonTemplate />
        </a-tab-pane>
        <a-tab-pane tab="专有属性" key="2">

          <!-- S 折线图专有配置 -->
          <p class="comment-template__title">折线</p>
          <div class="comment-template__content">
            <div class="comment-template__item">
              <p class="comment-template__leading">类型:</p>
              <div class="comment-template__inner">
                <a-select
                  class="lines-config__select"
                  v-model="config.proprietaryConfig.lineStyle.type" @change="$emit('change')">
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
                  class="lines-config__select"
                  v-model="config.proprietaryConfig.smooth">
                  <a-select-option :value="0">正常</a-select-option>
                  <a-select-option :value="1">平滑</a-select-option>
                </a-select>
              </div>
            </div>
            <!-- / 平滑 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">粗细:</p>
              <div class="comment-template__inner">
                <a-slider v-model="config.proprietaryConfig.lineStyle.width" :min="1" :max="10" />
              </div>
            </div>
            <!-- / 粗细 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">颜色:</p>
              <div class="comment-template__inner">
                <ColorPicker
                  v-model="config.proprietaryConfig.lineStyle.color"/>
              </div>
            </div>
            <!-- / 颜色 -->

          </div>

          <p class="comment-template__title">图例</p>
          <div class="comment-template__content">
            <div class="comment-template__item">
              <p class="comment-template__leading">显示:</p>
              <div class="comment-template__inner">
                <a-select
                  class="lines-config__select"
                  v-model="config.proprietaryConfig.legend.show">
                  <a-select-option :value="1">显示</a-select-option>
                  <a-select-option :value="0">不显示</a-select-option>
                </a-select>
              </div>
            </div>
            <!-- / 显示 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">方向:</p>
              <div class="comment-template__inner">
                <a-select
                  class="lines-config__select"
                  v-model="config.proprietaryConfig.legend.orient">
                  <a-select-option value="horizontal">水平</a-select-option>
                  <a-select-option value="vertical">纵向</a-select-option>
                </a-select>
              </div>
            </div>
            <!-- / 方向 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">图标:</p>
              <div class="comment-template__inner">
                <a-select
                  class="lines-config__select"
                  v-model="config.proprietaryConfig.legend.icon">
                  <a-select-option value="circle">圆点</a-select-option>
                  <a-select-option value="rect">方形</a-select-option>
                </a-select>
              </div>
            </div>
            <!-- / 方向 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">颜色:</p>
              <div class="comment-template__inner">
                <ColorPicker
                  v-model="config.proprietaryConfig.legend.textStyle.color" />
              </div>
            </div>
            <!-- / 文字颜色 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">粗细:</p>
              <div class="comment-template__inner">
                <a-select
                  class="lines-config__select"
                  v-model="config.proprietaryConfig.legend.textStyle.fontWeight" >
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
                  :min="6" :max="24"
                  v-model="config.proprietaryConfig.legend.textStyle.fontSize" />
              </div>
            </div>
            <!-- / 粗细 -->

          </div>
          <!-- E 折线图专有配置 -->

        </a-tab-pane>
        <a-tab-pane tab="数据处理" key="3">

        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import '@/assets/less/template.less';
import _ from 'lodash';
import { mapState } from 'vuex';
import CommonTemplate from '../common/index.vue';
import ColorPicker from '@/components/colorPicker/index.vue';

export default {
  name: 'Lines',
  components: {
    CommonTemplate,
    ColorPicker,
  },
  computed: {
    ...mapState('screen', ['activeWidget', 'view']),
    config() {
      return _.cloneDeep(this.activeWidget.config);
    },
  },
};
</script>

<style scoped lang="less">
.lines-config {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0 12px;
  overflow: auto;

  &__select {
    width: 100%;
  }
}
</style>
