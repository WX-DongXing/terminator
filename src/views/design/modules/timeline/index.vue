<template>
  <div class="timeline">
    <div class="timeline__info">
      <span>动画调度</span>
    </div>
    <div class="timeline__content">
      <div class="timeline__widgets">
        <div
          class="timeline__widget"
          v-for="(widget, index) in widgets"
          :key="widget.widgetId"
          :class="[
            index % 2 === 0 ? 'timeline__widget--even' : 'timeline__widget--odd',
            activeWidget.widgetId === widget.widgetId && 'timeline__widget--active'
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
            <div class="timeline__expand" @click="handleSelect(widget)" v-if="widget.config.isExpanded"></div>
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

export default {
  name: 'Timeline',
  computed: {
    ...mapState('screen', ['activeWidget', 'view']),
    ...mapGetters('screen', ['widgets'])
  },
  data () {
    return {
      canvas: null,
      isSubscribed: true,
      canvasRect: null,
      panelResize$: new Subject()
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
    },
    /**
     * 面板resize事件
     * @param event
     */
    panelResize (event) {
      this.panelResize$.next(event)
    }
  },
  mounted () {
    merge(
      this.panelResize$.asObservable(),
      fromEvent(window, 'resize')
    )
      .pipe()
      .subscribe(res => {
        this.canvasRect = this.$refs.area.getBoundingClientRect()
        const { width, height } = this.canvasRect
        this.canvas.setDimensions({ width, height })
      })

    const { width, height } = this.$refs.area.getBoundingClientRect()
    this.canvas = new fabric.Canvas('board', {
      width,
      height
    })
    const rect = new fabric.Rect({
      width: 100,
      height: 100,
      fill: 'red'
    })
    this.canvas.add(rect)
    console.log(this.canvas)
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
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    overflow: auto;
  }

  &__widgets {
    flex: none;
    width: 240px;
    height: 100%;
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
  }

  &__area {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .06);

    canvas {
      width: 100%;
      height: 100%;
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
