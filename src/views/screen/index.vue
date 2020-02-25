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
      <div class="screen__control" @click="panelControl('left')">
        <span v-if="leftPanelExpand">
          <a-icon type="menu-fold" />
        </span>
        <a-button v-else type="link" icon="appstore">组件库</a-button>
      </div>
      <div class="screen__control" @click="panelControl('right')">
        <span v-if="rightPanelExpand">
          <a-icon type="menu-unfold" />
        </span>
        <a-button v-else type="link" icon="setting">配置</a-button>
      </div>
    </div>

    <!-- S 画板 -->
    <div
      ref="page"
      class="page"
      @click.self="() => select$.next({ el: 'page' })">

      <div class="gauge" ref="gauge"></div>
      <!-- / 标尺 -->

      <div ref="view" class="view">

        <Widget
          v-for="widget in widgets"
          :widget="widget"
          :key="widget.widgetId"
          :ref="widget.widgetId"
          @select="() => select$.next({ el: 'widget', widget })"
        />
        <!-- / 部件渲染 -->

        <Wrapper ref="wrapper" v-stream:adjust="adjust$" />
        <!-- / 选择指示器 -->

      </div>
      <!-- / 视图 -->

    </div>
    <!-- E 画板 -->

    <!-- S 比例条 -->
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
    <!-- E 比例条 -->

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
import Widget from './widget/index.vue'
import AdjustMixins from '@/components/wrapper/AdjustMixins.vue'
import WrapperService from '@/components/wrapper/WrapperService'

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
    leftPanelExpand: true,
    rightPanelExpand: true,
    backgroundColor: 'rgba(255,255,255,1)',
    scale: 1,
    isAutoResize: true,
    isSubscribed: true,
    isResize: false,
    wrapperChange$: new WrapperService().change$
  }),
  mounted () {
    // 视图change事件处理
    merge(
      fromEvent(window, 'resize').pipe(mapTo({ type: 'resize' })),
      this.change$
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
            gauge: this.$refs.gauge,
            parent: this.$refs.page,
            scale: this.scale
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
      ),
      this.wrapperChange$
    )
      .pipe(
        takeWhile(() => this.isSubscribed),
        // 当拓扑视图在编辑时禁用其他部件的激活功能
        filter(({ el }) => !this.topologyEditable || el === 'topology')
      )
      .subscribe(({ el, widget, value }) => {
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
          case 'topology':
            activeWidget = widget
            styles = {
              display: value ? 'block' : 'none'
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
        const { widgetId, config, render } = this.activeWidget
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
        if (config.type === 'Topology') {
          this.activeWidget.render.resize(
            render.container.offsetWidth,
            render.container.offsetHeight
          )
        }
        this.activeWidget.render.resize()
      })
  },
  computed: {
    ...mapState('screen', ['view', 'widgets', 'activeWidget', 'topologyEditable'])
  },
  methods: {
    ...mapMutations('screen', {
      setView: ScreenMutations.SET_VIEW,
      activationWidget: ScreenMutations.ACTIVATION_WIDGET
    }),
    /**
     * 左右panel展开与否
     * @param type 左右panel
     */
    panelControl (type) {
      const mapping = new Map([
        ['left', 'leftPanelExpand'],
        ['right', 'rightPanelExpand']
      ])
      this[mapping.get(type)] = !this[mapping.get(type)]
      this.$emit(type, this[mapping.get(type)])
      setTimeout(() => {
        this.change$.next({ type: 'resize' })
      }, 400)
    },
    /**
     * 设置视图缩放及尺寸
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
        scale: this.scale,
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
    position: relative;
    flex: none;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    background: white;
    box-shadow: 0 2px 8px #f0f1f2;
    z-index: 4;

    p {
      margin: 0;
    }
  }

  &__control {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    height: 100%;

    & span {
      flex: none;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      width: 48px;
      height: 100%;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
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
  z-index: 3;

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
