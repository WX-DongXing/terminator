/**
* 视图配置模板
* Author: dong xing
* Date: 2019/11/13
* Time: 1:44 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="comment-template">
    <div class="comment-template__header">
      <p class="comment-template__name">画板</p>
    </div>

    <!-- S 视图配置 -->
    <div class="view-config">
      <a-collapse :activeKey="[1, 2, 3]" :bordered="false">

        <!-- S 尺寸 -->
        <a-collapse-panel header="尺寸" key="1">

          <div class="comment-template__item">
            <p class="comment-template__leading">宽:</p>
            <div class="comment-template__inner">
              <a-input
                type="number"
                v-model.number="config.commonConfig.width"
                @change="change" />
            </div>
          </div>
          <!-- / 宽 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">高:</p>
            <div class="comment-template__inner">
              <a-input
                type="number"
                v-model.number="config.commonConfig.height"
                @change="change" />
            </div>
          </div>
          <!-- / 高 -->

        </a-collapse-panel>
        <!-- E 尺寸 -->

        <!-- E 背景 -->
        <a-collapse-panel header="背景" key="2">

          <div class="comment-template__item">
            <p class="comment-template__leading">模式:</p>
            <div class="comment-template__inner comment-template__end">
              <a-radio-group
                buttonStyle="solid"
                v-model="config.proprietaryConfig.mode"
                @change="change">
                <a-radio-button value="color">颜色</a-radio-button>
                <a-radio-button value="image">图片</a-radio-button>
              </a-radio-group>
            </div>
          </div>
          <!-- / 模式 -->

          <div class="comment-template__item" v-if="config.proprietaryConfig.mode === 'color'">
            <p class="comment-template__leading">颜色:</p>
            <div class="comment-template__inner">
              <ColorPicker
                v-model="config.proprietaryConfig.backgroundColor"
                @change="change" />
            </div>
          </div>
          <!-- / 颜色 -->

          <div v-else>
            <div class="comment-template__item">
              <p class="comment-template__leading">图片:</p>
              <div class="comment-template__inner">
                <a-input
                  type="text"
                  v-model.trim="config.proprietaryConfig.backgroundImage"
                  @change="change" />
              </div>
            </div>
            <!-- / 图片 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">重复:</p>
              <div class="comment-template__inner">
                <a-select
                  v-model="config.proprietaryConfig.backgroundRepeat"
                  @change="change">
                  <a-select-option value="no-repeat">不重复</a-select-option>
                  <a-select-option value="repeat">重复</a-select-option>
                  <a-select-option value="repeat-x">重复X轴</a-select-option>
                  <a-select-option value="repeat-y">重复Y轴</a-select-option>
                </a-select>
              </div>
            </div>
            <!-- / 尺寸 -->

            <div class="comment-template__item">
              <p class="comment-template__leading">尺寸:</p>
              <div class="comment-template__inner">
                <a-select
                  v-model="config.proprietaryConfig.backgroundSize"
                  @change="change">
                  <a-select-option value="">默认大小</a-select-option>
                  <a-select-option value="contain">伸展扩展以适配屏幕</a-select-option>
                  <a-select-option value="cover">等比扩展以适配屏幕</a-select-option>
                </a-select>
              </div>
            </div>
            <!-- / 尺寸 -->

          </div>

        </a-collapse-panel>
        <!-- E 背景 -->

        <!-- S 显示 -->
        <a-collapse-panel header="显示" key="3">

          <div class="comment-template__item">
            <p class="comment-template__leading">缩放模式:</p>
            <div class="comment-template__inner">
              <a-select
                v-model="config.proprietaryConfig.scaleMode"
                @change="change">
                <a-select-option value="primary">原始尺寸</a-select-option>
                <a-select-option value="fullscreen">全屏显示</a-select-option>
                <a-select-option value="fullWidth">等比宽度铺满</a-select-option>
                <a-select-option value="fullHeight">等比高度铺满</a-select-option>
              </a-select>
            </div>
          </div>
          <!-- / 缩放模式 -->

        </a-collapse-panel>
        <!-- S 显示 -->

      </a-collapse>

    </div>
    <!-- E 视图配置 -->

  </div>
</template>

<script>
import '@/assets/less/template.less'
import _ from 'lodash'
import anime from 'animejs'
import { mapState, mapMutations } from 'vuex'
import { ScreenMutations } from '@/store/modules/screen'
import ColorPicker from '@/components/colorPicker/index.vue'

export default {
  name: 'ViewConfig',
  components: {
    ColorPicker
  },
  computed: {
    ...mapState('screen', ['view', 'scale']),
    config () {
      return _.cloneDeep(this.view.config)
    }
  },
  methods: {
    ...mapMutations('screen', {
      setView: ScreenMutations.SET_VIEW
    }),
    change () {
      this.setView({
        view: Object.assign(_.cloneDeep(this.view), { config: this.config })
      })
      const { el, gauge, scale } = this.view
      const {
        commonConfig: { height, width },
        proprietaryConfig: {
          mode,
          backgroundColor,
          backgroundImage,
          backgroundRepeat,
          backgroundSize
        }
      } = this.config

      anime.set(el, {
        backgroundImage: mode === 'image' ? `url(${backgroundImage})` : '',
        backgroundRepeat,
        backgroundSize
      })

      anime({
        targets: el,
        width,
        height,
        backgroundColor: mode === 'color' ? backgroundColor : '',
        duration: 150,
        easing: 'linear'
      })
      anime({
        targets: gauge,
        width: width * scale + 32,
        height: height * scale + 32,
        duration: 150,
        easing: 'linear'
      })
    }
  }
}
</script>

<style scoped lang="less">
.view-config {
  height: 100%;
  width: 100%;
  overflow: auto;
  padding-top: 16px;

  &__content {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;

    .ant-input-group-wrapper {
      margin: 0 12px;
    }
  }
}
</style>
