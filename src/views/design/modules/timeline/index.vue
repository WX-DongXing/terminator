<template>
  <div class="timeline">
    <div class="timeline__info">
      <span>动画调度</span>
    </div>
    <div class="timeline__content">
      <div class="timeline__widgets" ref="widgets">
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
    ...mapState('screen', ['activeWidget', 'view']),
    ...mapGetters('screen', ['widgets']),
    activeWidgetId () {
      return this.activeWidget ? this.activeWidget.widgetId : null
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
      option: {
        name: 'Z方向位移',
        value: 0,
        type: 'width',
        timelines: []
      }
    }
  },
  methods: {
    ...mapMutations('screen', {
      activateWidget: ScreenMutations.ACTIVATE_WIDGET,
      updateWidget: ScreenMutations.UPDATE_WIDGET
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
        hasBorders: true,
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
        const { left, width } = dragCenterRect
        dragLeftHalfCircle.set({ left: left + 6 })
        dragRightHalfCircle.set({ left: left + width + 6 })
      })

      dragCenterRect.on('mouseup', (event) => {
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
    box-sizing: border-box;
    padding: 0 12px;
    border-bottom: 1px solid #D9D9D9;
    font-weight: bold;
  }

  &__content {
    height: 100%;
    width: 100%;
    overflow: auto;
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
