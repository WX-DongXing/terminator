/**
* 矩形配置面板
* Author: dong xing
* Date: 2020/3/19
* Time: 17:10
* Email: dong.xing@outlook.com
*/

<template>
  <div class="rects-config">
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
        <div class="rects-config__template">
          <a-collapse defaultActiveKey="1" :bordered="false">

            <!-- S 文本样式 -->
            <a-collapse-panel header="样式" key="1">

              <div class="comment-template__item">
                <p class="comment-template__leading">填充颜色:</p>
                <div class="comment-template__inner">
                  <ColorPicker
                    v-model="config.proprietaryConfig.graphic.style.fill"
                    @change="change" />
                </div>
              </div>
              <!-- / 填充颜色 -->

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

            </a-collapse-panel>
            <!-- E 文本样式 -->

            <!-- S 圆角 -->
            <a-collapse-panel header="内圆角" key="2">

              <div class="comment-template__item">
                <p class="comment-template__leading">左上:</p>
                <div class="comment-template__inner">
                  <a-slider
                    :min="0"
                    :max="48"
                    @change="change"
                    v-model.number="config.proprietaryConfig.graphic.shape.borderTopLeftRadius" />
                </div>
              </div>
              <!-- / 左上圆角 -->

              <div class="comment-template__item">
                <p class="comment-template__leading">右上:</p>
                <div class="comment-template__inner">
                  <a-slider
                    :min="0"
                    :max="48"
                    @change="change"
                    v-model.number="config.proprietaryConfig.graphic.shape.borderTopRightRadius" />
                </div>
              </div>
              <!-- / 右上圆角 -->

              <div class="comment-template__item">
                <p class="comment-template__leading">右下:</p>
                <div class="comment-template__inner">
                  <a-slider
                    :min="0"
                    :max="48"
                    @change="change"
                    v-model.number="config.proprietaryConfig.graphic.shape.borderBottomRightRadius" />
                </div>
              </div>
              <!-- / 右下圆角 -->

              <div class="comment-template__item">
                <p class="comment-template__leading">左下:</p>
                <div class="comment-template__inner">
                  <a-slider
                    :min="0"
                    :max="48"
                    @change="change"
                    v-model.number="config.proprietaryConfig.graphic.shape.borderBottomLeftRadius" />
                </div>
              </div>
              <!-- / 左下圆角 -->

            </a-collapse-panel>
            <!-- E 圆角 -->

          </a-collapse>
        </div>
      </a-tab-pane>

    </a-tabs>
  </div>
</template>

<script>
import '@/assets/less/template.less'
import CommonTemplate from '../common'
import ProprietaryMixins from '../propietaryMixins'
import ColorPicker from '@/components/ColorPicker'

export default {
  name: 'Rects',
  mixins: [ProprietaryMixins],
  components: {
    CommonTemplate,
    ColorPicker
  }
}
</script>

<style scoped lang="less">
</style>
