<template>
  <div class="timeline">
    <div class="timeline__info">
      <div class="timeline__title">
        <span>动画调度</span>
      </div>
      <div class="timeline__time">
        <span>{{ timeScale }}</span>
      </div>
    </div>
    <div class="timeline__content">
      <div class="timeline__widgets" ref="widgets">
        <div class="timeline__icons">
          <a-icon
            :type="isPlay ? 'pause-circle' : 'play-circle'"
            :class="[isPlay && 'timeline__icons--active']"
            @click="handlePlay"
          />
          <a-icon
            type="rollback"
            @click="handleRollBack"
          />
          <a-icon
            type="retweet"
            :class="[loop && 'timeline__icons--active']"
            @click="handleLoop"
          />
        </div>
        <div
          class="timeline__widget"
          v-for="(widget, index) in widgets"
          :key="widget.widgetId"
          :class="[
            index % 2 === 0 ? 'timeline__widget--even' : 'timeline__widget--odd',
            activeWidgetId === widget.widgetId && 'timeline__widget--active'
          ]"
        >
          <div class="timeline__row">
            <div class="timeline__icon" @click="handleExpand(widget)">
              <a-icon type="right" :class="[widget.config.isExpanded ? 'timeline__icon--down' : 'timeline__icon--right']" />
            </div>
            <div class="timeline__logo" @click="handleSelect(widget)">
              <a-icon :type="widget.config.icon" />
              <span>{{ widget.config.name }}</span>
            </div>
          </div>
          <transition name="timeline-expand">
            <div class="timeline__expand" @click="handleSelect(widget)" v-if="widget.config.isExpanded">
              <prop-control
                v-for="(prop, i) in widget.animateProps.props"
                :prop="prop"
                :prop-index="i"
                :widget-index="index"
                :key="prop.type"
                @recordTime="(prop) => handleRecordTime(prop, i, index)"
              />
            </div>
          </transition>
        </div>
      </div>
      <div class="timeline__area" ref="area">
        <canvas id="board" />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import { fromEvent, Subject, merge } from 'rxjs'
import { fabric } from 'fabric'
import { mapGetters, mapMutations, mapState } from 'vuex'
import { ScreenMutations } from '@/store/modules/screen'
import PropControl from '@/components/PropControl'

export default {
  name: 'Timeline',
  components: {
    PropControl
  },
  computed: {
    ...mapState('screen', [
      'activeWidget', 'view', 'maxTime',
      'time', 'startTime', 'endTime'
    ]),
    ...mapGetters('screen', ['widgets']),
    activeWidgetId () {
      return this.activeWidget ? this.activeWidget.widgetId : null
    },
    timeScale () {
      return moment(this.time).format('mm:ss:SS')
    }
  },
  data () {
    return {
      canvas: null,
      isSubscribed: true,
      panelResize$: new Subject(),
      rect: null,
      dragLeftState: null,
      dragRightState: null,
      dragCenterState: null,
      loop: false,
      isPlay: false,
      groups: []
    }
  },
  methods: {
    ...mapMutations('screen', {
      activateWidget: ScreenMutations.ACTIVATE_WIDGET,
      updateWidget: ScreenMutations.UPDATE_WIDGET,
      setScreenState: ScreenMutations.SET_SCREEN_STATE
    }),
    /**
     * 选择激活的部件
     * @param widget
     */
    handleSelect (widget) {
      this.activateWidget({ widget })
      this.$emit('select', widget)
    },
    /**
     * 展开部件栏
     * @param widget
     */
    handleExpand (widget) {
      const index = this.widgets.findIndex(item => item.widgetId === widget.widgetId)
      widget.config.isExpanded = !widget.config.isExpanded
      this.updateWidget({ index, widget })
      setTimeout(() => this.panelResize(), 100)
    },
    /**
     * 面板resize事件
     * @param event
     */
    panelResize (event) {
      this.panelResize$.next(event)
    },
    /**
     * 设置播放
     */
    handlePlay () {
      this.isPlay = !this.isPlay
    },
    /**
     * 设置刻度控制器归零
     */
    handleRollBack () {
    },
    /**
     * 设置循环
     */
    handleLoop () {
      this.loop = !this.loop
    },
    /**
     * 记录时间点位
     */
    handleRecordTime (prop, index, widgetIndex) {
      const widget = this.widgets[widgetIndex]
      const currentProps = _.cloneDeep(prop)
      if (prop.timeline.length === 0) {
        const initProp = { time: +this.time.toFixed(2), ..._.omit(currentProps, ['timeline']) }
        currentProps.timeline.push(initProp)
      } else {
        currentProps.timeline = []
      }
      widget.animateProps.props.splice(index, 1, currentProps)
      this.updateWidget({ index: widgetIndex, widget })
    },
    /**
     * 初始化拖拽栏状态
     */
    initDragState () {
      const { width } = this.rect
      this.dragLeftState = {
        left: 24,
        top: 4
      }
      this.dragRightState = {
        left: width - 12,
        top: 4
      }
      this.dragCenterState = {
        left: 18,
        top: 4,
        width: width - 36
      }
    },
    /**
     * 添加拖动槽
     */
    addDragGroove () {
      const { width } = this.rect
      // 拖拽栏背景颜色
      const dragRectBack = new fabric.Rect({
        width,
        height: 20,
        fill: 'rgba(0, 0, 0, .12)',
        selectable: false,
        hoverCursor: 'default',
        strokeWidth: 0,
        selection: false
      })
      const groveLeftHalfCircle = new fabric.Circle({
        radius: 6,
        left: 24,
        top: 4,
        startAngle: 0,
        endAngle: Math.PI,
        strokeWidth: 0,
        borderColor: 'red',
        fill: 'rgba(0, 0, 0, .12)',
        angle: 90
      })
      const groveRightHalfCircle = new fabric.Circle({
        radius: 6,
        left: width - 12,
        top: 4,
        startAngle: Math.PI,
        endAngle: Math.PI * 2,
        strokeWidth: 0,
        fill: 'rgba(0, 0, 0, .12)',
        angle: 90
      })
      const groveCenterRect = new fabric.Rect({
        width: width - 36,
        height: 12,
        top: 4,
        left: 18,
        fill: 'rgba(0, 0, 0, .12)',
        strokeWidth: 0
      })
      const groveGroup = new fabric.Group([
        groveLeftHalfCircle,
        groveRightHalfCircle,
        groveCenterRect
      ], {
        selectable: false,
        hoverCursor: 'default'
      })
      this.canvas.add(
        dragRectBack,
        groveGroup
      )
      this.canvas.renderAll()
    },
    /**
     * 添加拖动条
     */
    addDragBar () {
      const { width } = this.rect
      const dragCenterRect = new fabric.Rect({
        width: width - 36,
        height: 12,
        top: 4,
        left: 18,
        fill: 'white',
        strokeWidth: 0,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false,
        selection: false,
        hoverCursor: 'move'
      })
      const dragLeftHalfCircle = new fabric.Circle({
        radius: 6,
        left: 24,
        top: 4,
        startAngle: 0,
        endAngle: Math.PI,
        strokeWidth: 0,
        fill: '#40a9ff',
        angle: 90,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false,
        selection: false,
        hoverCursor: 'e-resize'
      })
      const dragRightHalfCircle = new fabric.Circle({
        radius: 6,
        left: width - 12,
        top: 4,
        startAngle: Math.PI,
        endAngle: Math.PI * 2,
        strokeWidth: 0,
        fill: '#40a9ff',
        angle: 90,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false,
        selection: false,
        hoverCursor: 'e-resize'
      })

      dragLeftHalfCircle.on('moving', (event) => {
        const { target: { left } } = event.transform
        let currentLeft
        if (left < 24) {
          currentLeft = 24
          dragLeftHalfCircle.set({
            left: currentLeft,
            lockMovementX: true
          })
        } else if (left >= 24 && left < this.dragRightState.left - 12) {
          currentLeft = left
          dragCenterRect.set({ left: left - 6, width: this.dragRightState.left - left })
        } else {
          currentLeft = this.dragRightState.left - 12
          dragLeftHalfCircle.set({
            left: currentLeft,
            lockMovementX: true
          })
        }
        this.dragLeftState.left = currentLeft
      })

      dragLeftHalfCircle.on('mouseup', () => {
        dragLeftHalfCircle.lockMovementX = false
        Object.assign(this.dragLeftState, dragLeftHalfCircle)
        Object.assign(this.dragCenterState, dragCenterRect)
      })

      dragRightHalfCircle.on('moving', (event) => {
        const { target: { left } } = event.transform
        let currentLeft
        if (left > this.rect.width - 12) {
          currentLeft = this.rect.width - 12
          dragRightHalfCircle.set({
            left: currentLeft,
            lockMovementX: true
          })
        } else if (left <= this.rect.width - 12 && left >= this.dragLeftState.left + 12) {
          currentLeft = left
          dragCenterRect.set({ width: left - this.dragLeftState.left })
        } else {
          currentLeft = this.dragLeftState.left + 12
          dragRightHalfCircle.set({
            left: currentLeft,
            lockMovementX: true
          })
        }
        this.dragRightState.left = currentLeft
      })

      dragRightHalfCircle.on('mouseup', (event) => {
        dragRightHalfCircle.lockMovementX = false
        Object.assign(this.dragRightState, dragRightHalfCircle)
        Object.assign(this.dragCenterState, dragCenterRect)
      })

      dragCenterRect.on('moving', (event) => {
        const { target: { left } } = event.transform
        if (left < 18) {
          dragCenterRect.set({
            lockMovementX: true,
            left: 18
          })
        }
        if (this.dragCenterState.width + left > this.rect.width - 18) {
          dragCenterRect.set({
            lockMovementX: true,
            left
          })
        }
        const { left: rectLeft, width } = dragCenterRect
        dragLeftHalfCircle.set({ left: rectLeft + 6 })
        dragRightHalfCircle.set({ left: rectLeft + width + 6 })
      })

      dragCenterRect.on('mouseup', (event) => {
        dragCenterRect.lockMovementX = false
        Object.assign(this.dragLeftState, dragLeftHalfCircle)
        Object.assign(this.dragRightState, dragRightHalfCircle)
        Object.assign(this.dragCenterState, dragCenterRect)
      })

      this.canvas.add(
        dragCenterRect,
        dragLeftHalfCircle,
        dragRightHalfCircle
      )
      this.canvas.renderAll()
    },
    /**
     * 添加时间刻度条
     */
    addTimeScale () {
      const { width, height } = this.rect
      // 刻度栏背景颜色
      const scaleRectBack = new fabric.Rect({
        width,
        height: 40,
        top: 20,
        fill: 'rgba(0, 0, 0, .06)',
        selectable: false,
        hoverCursor: 'default',
        strokeWidth: 0,
        selection: false
      })

      const scaleDragTriangle = new fabric.Triangle({
        width: 12,
        height: 12,
        top: 32,
        left: 18,
        fill: '#40a9ff',
        originX: 'center',
        originY: 'center',
        angle: 180
      })

      this.scaleDragLine = new fabric.Line([0, 0, 0, height], {
        strokeWidth: 1,
        left: 17.5,
        top: 38,
        stroke: '#40a9ff'
      })

      this.dragScaleGroup = new fabric.Group([
        scaleDragTriangle,
        this.scaleDragLine
      ], {
        centeredRotation: false,
        lockMovementY: true,
        hasControls: false,
        hasBorders: false,
        selection: false
      })

      this.dragScaleGroup.on('moving', (event) => {
        const { target: { left } } = event.transform
        let currentTime = (left - 12) * this.maxTime / (this.rect.width - 36)
        if (currentTime <= 0) {
          currentTime = 0
        } else if (currentTime >= this.maxTime) {
          currentTime = this.maxTime
        }
        this.setScreenState({
          time: currentTime
        })
      })

      this.canvas.add(
        scaleRectBack,
        this.dragScaleGroup
      )
      this.canvas.moveTo(this.dragScaleGroup, 1000)
      this.canvas.renderAll()
    },
    /**
     * 添加时间刻度文本
     */
    addTimeScaleText () {
      const { width } = this.rect
      const bottomLine = new fabric.Line([0, 0, width - 36, 0], {
        strokeWidth: 1,
        left: 18,
        top: 59,
        stroke: '#2c3e50',
        hoverCursor: 'default',
        selectable: false,
        selection: false
      })

      const ticks = new Array(6).fill(null).map((_, index) => {
        const left = (width - 36) / 5 * index
        const position = { top: 54, left: left + 18 }
        const textPosition = { top: 40, left: left + 12 }
        return [
          new fabric.Text(`${index * 2}s`, {
            strokeWidth: 0,
            fill: '#2c3e50',
            hoverCursor: 'default',
            selectable: false,
            selection: false,
            fontSize: 12,
            fontFamily: 'Avenir", Helvetica, Arial, sans-serif',
            ...textPosition
          }),
          new fabric.Line([0, 0, 0, 5], {
            strokeWidth: 1,
            stroke: '#2c3e50',
            hoverCursor: 'default',
            selectable: false,
            selection: false,
            ...position
          })
        ]
      })

      this.canvas.add(
        bottomLine,
        ...ticks.flat()
      )
      this.canvas.renderAll()
    },
    /**
     * 添加点位条
     * @param animateProps
     * @param isExpanded
     * @param index
     */
    addPointBar (animateProps, isExpanded, index) {
      let group = this.groups[index]
      let top = 60
      const isExpandedList = this.widgets.map(widget => widget.config.isExpanded ? 1 : 0).slice(0, index)
      if (isExpandedList.length > 0) {
        top += isExpandedList.reduce((acc, cur) => {
          const height = cur ? 15 * 36 + 40 : 40
          acc += height
          return acc
        }, 0)
      }
      if (!group) {
        const { width } = this.rect
        const firstBar = new fabric.Rect({
          top: 0,
          width,
          height: 40,
          fill: 'white',
          selectable: false,
          hoverCursor: 'default',
          strokeWidth: 0,
          selection: false
        })
        const bars = animateProps.props.map((prop, index) => {
          const line = new fabric.Line([0, 0, width, 0], {
            strokeWidth: 1,
            left: 0,
            top: 0,
            stroke: 'white',
            selection: false
          })
          const rect = new fabric.Rect({
            width,
            height: 39,
            top: 1,
            fill: 'rgb(205, 205, 205)',
            selectable: false,
            hoverCursor: 'default',
            strokeWidth: 0,
            selection: false
          })
          const points = new fabric.Group([
            ...prop.timeline.map(item => {
              return new fabric.Rect({
                width: 8,
                height: 8,
                originX: 'center',
                originY: 'center',
                angle: 45,
                xr: 3,
                xy: 3,
                top: 20,
                left: (width - 36) / this.maxTime * item.time + 18,
                fill: '#40a9ff',
                lockMovementY: true,
                hasControls: false,
                hasBorders: false,
                selection: false
              })
            })
          ])
          return new fabric.Group([
            line, rect, points
          ], {
            top: 40 + 36 * index,
            selectable: false,
            hoverCursor: 'default',
            strokeWidth: 0,
            selection: false,
            visible: false
          })
        })

        group = new fabric.Group([
          firstBar,
          ...bars
        ], {
          top,
          left: 0,
          hoverCursor: 'default',
          selection: false,
          selectable: false
        })
        this.canvas.add(group)
        this.groups.push(group)
      } else {
        const { width } = this.rect
        const [, ...bars] = group.getObjects()
        group.set('top', top)
        bars.forEach((bar, index) => {
          const [,, points] = bar.getObjects()
          const prop = animateProps.props[index]
          if (prop.timeline.length > 0) {
            points.getObjects().forEach(point => {
              console.log('remove')
              points.remove(point)
            })
            const pointItems = prop.timeline.map(item => {
              return new fabric.Rect({
                width: 8,
                height: 8,
                originX: 'center',
                originY: 'center',
                angle: 45,
                top: 20,
                left: (width - 36) / this.maxTime * item.time + 18,
                fill: '#40a9ff',
                lockMovementY: true,
                hasControls: false,
                hasBorders: false,
                selection: false
              })
            })
            pointItems.forEach(point => {
              this.canvas.add(point)
            })
          }
          bar.set('visible', isExpanded)
        })
      }
    }
  },
  mounted () {
    const { height } = this.$refs.widgets.getBoundingClientRect()
    const { width } = this.$refs.area.getBoundingClientRect()
    this.rect = { height, width }

    this.initDragState()

    merge(
      this.panelResize$.asObservable(),
      fromEvent(window, 'resize')
    )
      .pipe()
      .subscribe(res => {
        const { height } = this.$refs.widgets.getBoundingClientRect()
        const { width } = this.$refs.area.getBoundingClientRect()
        this.rect = { height, width }
        this.canvas.setDimensions({ width, height })
      })

    this.canvas = new fabric.Canvas('board', {
      ...this.rect
    })
    this.addDragGroove()
    this.addDragBar()
    this.addTimeScale()
    this.addTimeScaleText()
  },
  watch: {
    widgets (v) {
      v.forEach(({ animateProps, config: { isExpanded } }, index) => {
        this.addPointBar(animateProps, isExpanded, index)
      })
    }
  },
  beforeDestroy () {
    this.isSubscribed = false
  }
}
</script>

<style scoped lang="less">
.timeline {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  &__info {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    flex: none;
    height: 43px;
    width: 100%;
    border-bottom: 1px solid #D9D9D9;
    font-weight: bold;
  }

  &__title {
    flex: none;
    width: 260px;
    box-sizing: border-box;
    padding: 0 12px;
  }

  &__time {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding: 0 12px;

    span {
      font-size: 12px;
      font-weight: normal;
    }
  }

  &__content {
    height: 100%;
    width: 100%;
    overflow: auto;
  }

  &__icons {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    flex: none;
    height: 60px;
    box-sizing: border-box;
    padding: 0 12px;
    border-top: 20px solid #40a9ff;
    border-bottom: 1px solid #D9D9D9;

    p {
      margin: 0;
    }

    i {
      cursor: pointer;
      font-size: 16px;
    }

    &--active {
      color: #40a9ff;
    }
  }

  &__widgets {
    float: left;
    width: 260px;
    min-height: 100%;
    padding-bottom: 16px;
  }

  &__widget {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;

    &--even {

    }

    &--odd {
      background-color: rgba(0, 0, 0, 0.02);
    }

    &:hover {
      background-color: rgba(64, 169, 255, 0.1);
    }

    &--active {
      background-color: rgba(64, 169, 255, 0.1);
      color: rgba(64, 169, 255, 1);
    }
  }

  &__row {
    flex: none;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    height: 40px;
    box-sizing: border-box;
    padding: 4px 4px;
    cursor: pointer;

    span {
      font-size: 12px;
      font-weight: bold;
      margin-left: 8px;
    }
  }

  &__icon {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    height: 100%;
    cursor: pointer;

    i {
      font-size: 12px;
      margin: 0 8px;
      transition: all 0.24s;
    }

    &--right {
      transform: rotate(0);
    }

    &--down {
      transform: rotate(90deg);
    }
  }

  &__logo {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 100%;
    font-size: 18px;
  }

  &__expand {
    min-height: 40px;
    height: 100%;
    padding-left: 22px;
  }

  &__area {
    float: right;
    width: calc(100% - 260px);
    height: 100%;

    canvas {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .06);
    }
  }
}

.timeline-expand-enter-active, .timeline-expand-leave-active {
  transition: height 0.24s;
  height: 100%;
}

.timeline-expand-enter, .timeline-expand-leave-to {
  height: 0;
}
</style>
