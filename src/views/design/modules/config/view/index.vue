/**
* 视图配置模板
* Author: dong xing
* Date: 2019/11/13
* Time: 1:44 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="view-config">
    <a-collapse :activeKey="activeKey" :bordered="false">

      <!-- S 尺寸 -->
      <a-collapse-panel header="尺寸" key="1">

        <div class="comment-template__item">
          <p class="comment-template__leading">宽:</p>
          <div class="comment-template__inner">
            <a-input
              type="number"
              v-model.number="targetView.config.commonConfig.width"
              @change="change" />
          </div>
        </div>
        <!-- / 宽 -->

        <div class="comment-template__item">
          <p class="comment-template__leading">高:</p>
          <div class="comment-template__inner">
            <a-input
              type="number"
              v-model.number="targetView.config.commonConfig.height"
              @change="change" />
          </div>
        </div>
        <!-- / 高 -->

      </a-collapse-panel>
      <!-- E 尺寸 -->

      <!-- E 背景 -->
      <a-collapse-panel header="背景" key="2" class="visible-collapse-panel">

        <div class="comment-template__item">
          <p class="comment-template__leading">模式:</p>
          <div class="comment-template__inner comment-template__end">
            <a-radio-group
              buttonStyle="solid"
              v-model="targetView.config.proprietaryConfig.mode"
              @change="modeChange">
              <a-radio-button value="single">单一</a-radio-button>
              <a-radio-button value="linear">渐变</a-radio-button>
              <a-radio-button value="image">图片</a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <!-- / 模式 -->

        <div class="comment-template__item" v-if="targetView.config.proprietaryConfig.mode === 'single'">
          <div class="comment-template__inner">
            <ColorPicker
              v-model="targetView.config.proprietaryConfig.backgroundColor"
              @change="singleColorChange" />
          </div>
        </div>
        <!-- / 单一颜色 -->

        <div class="comment-template__item" v-if="targetView.config.proprietaryConfig.mode === 'linear'">
          <div class="comment-template__inner">
            <LinearColorPicker
              show-angle
              v-model="targetView.config.proprietaryConfig.backgroundColor"
              @change="linearColorChange" />
          </div>
        </div>
        <!-- / 渐变颜色 -->

        <div v-if="targetView.config.proprietaryConfig.mode === 'image'">
          <div class="comment-template__item">
            <p class="comment-template__leading">图片:</p>
            <div class="comment-template__inner">
              <a-input
                type="text"
                v-model.trim="targetView.config.proprietaryConfig.backgroundImage"
                @change="change" />
            </div>
          </div>
          <!-- / 图片 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">重复:</p>
            <div class="comment-template__inner">
              <a-select
                v-model="targetView.config.proprietaryConfig.backgroundRepeat"
                @change="change">
                <a-select-option value="no-repeat">不重复</a-select-option>
                <a-select-option value="repeat">重复</a-select-option>
                <a-select-option value="repeat-x">水平重复</a-select-option>
                <a-select-option value="repeat-y">垂直重复</a-select-option>
              </a-select>
            </div>
          </div>
          <!-- / 尺寸 -->

          <div class="comment-template__item">
            <p class="comment-template__leading">尺寸:</p>
            <div class="comment-template__inner">
              <a-select
                v-model="targetView.config.proprietaryConfig.backgroundSize"
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
              v-model="targetView.config.proprietaryConfig.scaleMode"
              @change="change">
              <a-select-option value="auto">自适应</a-select-option>
              <a-select-option value="primary">原始尺寸</a-select-option>
              <a-select-option value="fullscreen">全屏显示</a-select-option>
              <a-select-option value="fullWidth">等比宽度铺满</a-select-option>
              <a-select-option value="fullHeight">等比高度铺满</a-select-option>
            </a-select>
          </div>
        </div>
        <!-- / 缩放模式 -->

      </a-collapse-panel>
      <!-- E 显示 -->

      <!-- S 屏幕截图 -->
      <a-collapse-panel header="封面" key="4">

        <div class="view-config__screen">
          <div class="view-config__screenshot">
            <img :src="targetView.cover" alt="" v-if="targetView.cover" />
            <p v-else>视图封面</p>
          </div>
        </div>

        <div class="comment-template__item">
          <p class="comment-template__leading">封面:</p>
          <div class="comment-template__inner">
            <a-textarea
              ref="screenshot"
              type="text"
              v-model.trim="targetView.cover"
              @change="change" />
          </div>
        </div>
        <!-- / 封面 -->

      </a-collapse-panel>
      <!-- E 屏幕截图 -->

    </a-collapse>

  </div>
</template>

<script>
import '@/assets/less/template.less'
import { fromEvent } from 'rxjs'
import { takeWhile, map, filter, switchMap } from 'rxjs/operators'
import { mapState, mapMutations } from 'vuex'
import { ScreenMutations } from '@/store/modules/screen'
import View from '@/model/view'
import ColorPicker from '@/components/ColorPicker'
import LinearColorPicker from '@/components/LinearColorPicker'
import ViewService from './index'

export default {
  name: 'ViewConfig',
  components: {
    ColorPicker,
    LinearColorPicker
  },
  data: () => ({
    isSubscribed: true,
    singleColor: 'rgba(255, 255, 255, 1)',
    linearColor: {
      start: 'rgba(255, 255, 255, 1)',
      end: 'rgba(0, 0, 0, 1)',
      angle: 180
    },
    activeKey: [1, 2, 3, 4],
    viewService: new ViewService()
  }),
  mounted () {
    // Todo 之后连接数据库后，做成上传，暂时将以本地 base64 图片储存，图片质量太大但是会有很大的性能问题
    // 监听粘贴时间，将粘贴板中的图片转成 base64
    fromEvent(this.$refs.screenshot.$el, 'paste')
      .pipe(
        takeWhile(() => this.isSubscribed),
        map(event => event.clipboardData && event.clipboardData.items),
        filter(items => items.length > 0 && items[0].type.indexOf('image') !== -1),
        switchMap(item => {
          const reader = new FileReader()
          reader.readAsDataURL(item[0].getAsFile())
          return fromEvent(reader, 'load')
        })
      )
      .subscribe(({ currentTarget }) => {
        this.targetView.cover = currentTarget.result || ''
        this.change()
      })
  },
  computed: {
    ...mapState('screen', ['view', 'scale']),
    targetView () {
      // Todo 如果将此处换为 _.cloneDeep(this.view) 则会遇到频繁更新bug，怀疑之前有循环调用问题，有待处理
      return new View(this.view)
    }
  },
  methods: {
    ...mapMutations('screen', {
      setView: ScreenMutations.SET_VIEW
    }),
    /**
     * 单一颜色更改
     */
    singleColorChange () {
      this.singleColor = this.targetView.config.proprietaryConfig.backgroundColor
      this.change()
    },
    /**
     * 渐变颜色更改
     */
    linearColorChange () {
      this.linearColor = this.targetView.config.proprietaryConfig.backgroundColor
      this.change()
    },
    /**
     * 模式更改
     */
    modeChange () {
      if (this.targetView.config.proprietaryConfig.mode !== 'image') {
        const backgroundColor = this.targetView.config.proprietaryConfig.mode === 'single'
          ? this.singleColor
          : this.linearColor
        Object.assign(this.targetView.config.proprietaryConfig, { backgroundColor })
      }
      this.change()
    },
    change () {
      this.setView({
        view: new View(this.targetView)
      })
      this.viewService.next('adjust')
    }
  },
  destroyed () {
    this.isSubscribed = false
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

  &__screen {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;

    & button {
      width: 100%;
    }
  }

  &__screenshot {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 140px;
    margin: 0 12px 12px;
    background: #e4e4e4;
    padding: 6px;
    border-radius: 4px;

    img {
      max-width: 100%;
      max-height: 100%;
    }

    p {
      color: #1890ff;
      margin: 0;
    }
  }
}
</style>
