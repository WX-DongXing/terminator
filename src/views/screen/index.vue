/**
* 视图及操作
* Author: dong xing
* Date: 2019/11/13
* Time: 1:44 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="screen">
    <div class="screen__header">
      <p>画板</p>
      <!--      <div class="screen__size">-->
      <!--        <a-input-->
      <!--          type="number"-->
      <!--          addonBefore="宽"-->
      <!--          v-model="width"-->
      <!--          @change="() => change$.next({ type: 'width', value: Number(width) })" />-->
      <!--        <a-input-->
      <!--          type="number"-->
      <!--          addonBefore="高"-->
      <!--          v-model="height"-->
      <!--          @change="() => change$.next({ type: 'height', value: Number(height) })" />-->
      <!--      </div>-->
    </div>

    <!-- S 画板 -->
    <div class="page" ref="page" @click.self="() => select$.next({ el: 'page' })">

      <div class="gauge" ref="gauge"></div>
      <!-- / 标尺 -->

      <div class="view" ref="view">

        <Widget
          v-for="widget in widgets"
          :widget="widget"
          :key="widget.widgetId"
          :ref="widget.widgetId"
          @select="() => select$.next({ el: 'widget', widget })"
        />
        <!-- / 部件渲染 -->

        <Wrapper ref="wrapper" v-stream:adjust="adjust$" />
      </div>
      <!-- / 视图 -->

    </div>
    <!-- E 画板 -->

    <div class="scale-bar">
      <a-tooltip placement="top">
        <template slot="title">
          自动比例：{{ isAutoResize ? '已开启' : '已关闭' }}
        </template>
        <a-switch
          size="small"
          v-model="isAutoResize"
          @change="() => isAutoResize && change$.next({ type: 'resize' })" />
      </a-tooltip>
      <a-slider
        class="scale-bar__slider"
        @change="() => change$.next({ type: 'scale', value: scale })"
        :disabled="isAutoResize"
        :min="0"
        :max="1"
        :step="0.01"
        v-model="scale" />
      <p class="scale-bar__number">缩放比：{{ this.scale.toFixed(2) }}</p>
    </div>
  </div>
</template>

<script>
import {
  fromEvent, merge, Subject, zip
} from 'rxjs'
import {
  startWith, mapTo, takeWhile,
  pluck, map, filter
} from 'rxjs/operators'
import { mapState, mapMutations } from 'vuex'
import anime from 'animejs'
import _ from 'lodash'
import { ScreenMutations } from '@/store/modules/screen'
import View from '@/model/view'
import Wrapper from '@/components/wrapper/index.vue'
import ViewService from '../config/view'
import Widget from './widget/index.vue'
import AdjustMixins from '@/components/wrapper/AdjustMixins.vue'

export default {
  name: 'Screen',
  components: {
    Wrapper,
    Widget
  },
  mixins: [AdjustMixins],
  // 选择器调整事件流
  domStreams: ['adjust$'],
  subscriptions () {
    // 画板change事件流
    this.change$ = new Subject()
    // 画板上元素触发事件流
    this.select$ = new Subject()
    return {
    }
  },
  data: () => ({
    width: 1920,
    height: 1080,
    backgroundColor: 'rgba(255,255,255,1)',
    scale: 1,
    isAutoResize: true,
    isSubscribed: true,
    isResize: false,
    viewChange$: new ViewService().change$
  }),
  mounted () {
    // 视图change事件处理
    merge(
      fromEvent(window, 'resize').pipe(mapTo({ type: 'resize' })),
      this.change$,
      this.viewChange$
    )
      .pipe(
        takeWhile(() => this.isSubscribed),
        startWith({ type: 'resize' })
      )
      .subscribe((event) => {
        // 设置缩放
        this.setScale(event)
        // 设置屏幕对象
        this.setView({
          view: new View({
            el: this.$refs.view,
            width: this.width,
            height: this.height,
            scale: this.scale,
            parent: this.$refs.page,
            backgroundColor: event.type === 'backgroundColor' ? event.value : 'rgba(255,255,255,1)'
          })
        })
      })
    // 选择激活的部件
    merge(
      this.select$,
      // 作为子元素的选择器事件取消冒泡，只有 mousedown 和 mouseup 时间逐次在 view 视图上触发时，才响应为一次事件
      zip(
        fromEvent(this.$refs.view, 'mousedown', { capture: false }),
        fromEvent(this.$refs.view, 'mouseup', { capture: false })
      ).pipe(
        map(events => ({ el: 'view', events })),
        filter(({ events }) => {
          // 过滤鼠标 mousedown 事件不在当前视图的事件，仅留下触发再视图上的事件
          const [mousedownEvent] = events
          return [...mousedownEvent.target.classList].includes('view')
        })
      )
    )
      .pipe(
        takeWhile(() => this.isSubscribed)
      )
      .subscribe(({ el, widget }) => {
        let activeWidget
        let styles = {}
        switch (el) {
          case 'view':
            activeWidget = this.view
            styles = { display: 'none' }
            break
          case 'page':
            activeWidget = null
            styles = { display: 'none' }
            break
          case 'widget':
            activeWidget = widget
            // eslint-disable-next-line no-case-declarations
            const { config: { commonConfig } } = widget
            styles = {
              display: 'block',
              width: commonConfig.width,
              height: commonConfig.height,
              top: commonConfig.top,
              left: commonConfig.left
            }
            break
          default:
            activeWidget = null
            break
        }
        if (el !== 'adjust') {
          // 设置激活的部件
          this.activationWidget({
            widget: activeWidget
          })
          // 设置选择器样式
          this.$refs.wrapper.setSize(styles)
        }
      })

    // 部件尺寸调整
    this.adjust$
      .pipe(
        takeWhile(() => this.isSubscribed),
        pluck('event', 'msg')
      )
      .subscribe((mutation) => {
        const { widgetId, render } = this.activeWidget
        const [targetComponent] = this.$refs[widgetId]
        const { event } = mutation
        // 当鼠标抬起时更新部件位置状态
        if (event.mouseType === 'mouseup') {
          const {
            top, left, width, height
          } = window.getComputedStyle(targetComponent.$el, null)
          const widgetPositionState = {
            top: Number(top.split('px')[0]) || 0,
            left: Number(left.split('px')[0]) || 0,
            width: Number(width.split('px')[0]) || 0,
            height: Number(height.split('px')[0]) || 0
          }
          // 更新部件位置信息
          const widget = _.cloneDeep(this.activeWidget)
          Object.assign(widget.config.commonConfig, widgetPositionState)
          this.activationWidget({
            widget: Object.assign(widget, { render })
          })
          return
        }
        // 调整部件大小
        this.adjust({
          target: targetComponent.$el,
          mutation
        })
        // 调整图表尺寸
        this.activeWidget.render.chart.resize()
      })
  },
  computed: {
    ...mapState('screen', ['view', 'widgets', 'activeWidget'])
  },
  methods: {
    ...mapMutations('screen', {
      setView: ScreenMutations.SET_VIEW,
      activationWidget: ScreenMutations.ACTIVATION_WIDGET
    }),
    /**
     * 设置视图缩放
     * @param event
     */
    setScale (event) {
      const { width, height } = this.$refs.page.getBoundingClientRect()
      const xScale = ((width - 32) / this.width)
      const yScale = ((height - 32) / this.height)
      // 如果视图的更改类型为resize，则根据宽高最小的比例设置缩放，其余更改只更新该类型变量数据
      if (event.type === 'resize') {
        this.scale = Math.min(xScale, yScale)
      } else {
        this[event.type] = event.value
      }
      anime({
        targets: this.$refs.view,
        width: this.width,
        height: this.height,
        scale: this.scale,
        backgroundColor: this.backgroundColor,
        duration: 150,
        easing: 'linear'
      })
      anime({
        targets: this.$refs.gauge,
        width: this.width * this.scale + 32,
        height: this.height * this.scale + 32,
        duration: 150,
        easing: 'linear'
      })
    }
  },
  beforeDestroy () {
    this.isSubscribed = false
  }
}
</script>

<style scoped lang="less">
.screen {
  height: calc(100vh - 54px);
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: stretch;
  background: whitesmoke;

  &__header {
    flex: none;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    box-sizing: border-box;
    padding: 0 16px;
    background: white;
    border-bottom: 1px solid rgba(0, 0, 0, .3);

    p {
      margin: 0;
    }
  }

  &__size {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;

    .ant-input-group-wrapper {
      width: 120px;
      margin-left: 16px;
    }
  }
}

.page {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  overflow: auto;
  background: #f1f1f1;
}

.gauge {
  position: absolute;
  top: 0;
  left: 0;
}

.scale-bar {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  padding: 0 16px;
  height: 48px;
  background: white;
  border: 2px solid whitesmoke;
  border-bottom: none;

  &__slider.ant-slider {
    width: 200px;
    margin: 0 16px;
  }

  &__number {
    width: 85px;
    margin: 0;
  }
}

.view {
  position: relative;
  height: 1080px;
  width: 1920px;
  margin: 16px 0 0 16px;
  background: white;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2),
  0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
  transform-origin: 0 0;
  overflow: hidden;
}
</style>
