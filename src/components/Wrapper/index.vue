/**
* 部件选择器
* Author: dong xing
* Date: 2019/11/13
* Time: 5:27 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div id="wrapper" class="wrapper" ref="wrapper">
    <div class="wrapper__mask" ref="mask"></div>
    <div class="wrapper__handler wrapper__handler--tl" ref="tl"></div>
    <div class="wrapper__handler wrapper__handler--tc" ref="tc"></div>
    <div class="wrapper__handler wrapper__handler--tr" ref="tr"></div>
    <div class="wrapper__handler wrapper__handler--cr" ref="cr"></div>
    <div class="wrapper__handler wrapper__handler--br" ref="br"></div>
    <div class="wrapper__handler wrapper__handler--bc" ref="bc"></div>
    <div class="wrapper__handler wrapper__handler--bl" ref="bl"></div>
    <div class="wrapper__handler wrapper__handler--cl" ref="cl"></div>
    <div class="wrapper__move" ref="move"></div>
  </div>
</template>

<script>
import { Subject, fromEvent, merge } from 'rxjs'
import {
  takeWhile, takeUntil, switchMap,
  tap, map, withLatestFrom, filter,
  first
} from 'rxjs/operators'
import anime from 'animejs'
import AdjustMixins from './AdjustMixins.vue'

export default {
  name: 'Wrapper',
  data: () => ({
    isSubscribed: true,
    originalState: null
  }),
  mixins: [AdjustMixins],
  mounted () {
    this.change$ = new Subject()
    this.documentMove$ = fromEvent(document, 'mousemove')
    this.documentUp$ = fromEvent(document, 'mouseup')
    this.tl$ = fromEvent(this.$refs.tl, 'mousedown').pipe(
      map(event => ({ type: 'tl', event }))
    )
    this.tc$ = fromEvent(this.$refs.tc, 'mousedown').pipe(
      map(event => ({ type: 'tc', event }))
    )
    this.tr$ = fromEvent(this.$refs.tr, 'mousedown').pipe(
      map(event => ({ type: 'tr', event }))
    )
    this.cr$ = fromEvent(this.$refs.cr, 'mousedown').pipe(
      map(event => ({ type: 'cr', event }))
    )
    this.br$ = fromEvent(this.$refs.br, 'mousedown').pipe(
      map(event => ({ type: 'br', event }))
    )
    this.bc$ = fromEvent(this.$refs.bc, 'mousedown').pipe(
      map(event => ({ type: 'bc', event }))
    )
    this.bl$ = fromEvent(this.$refs.bl, 'mousedown').pipe(
      map(event => ({ type: 'bl', event }))
    )
    this.cl$ = fromEvent(this.$refs.cl, 'mousedown').pipe(
      map(event => ({ type: 'cl', event }))
    )
    this.move$ = fromEvent(this.$refs.move, 'mousedown').pipe(
      map(event => ({ type: 'move', event }))
    )
    this.all$ = merge(
      this.tl$, this.tc$, this.tr$, this.cr$,
      this.br$, this.bc$, this.bl$, this.cl$, this.move$
    )

    this.all$
      .pipe(
        takeWhile(() => this.isSubscribed),
        tap(({ event }) => {
          event.preventDefault()
          event.stopPropagation()
          // 鼠标按下后所处位置的相对位置
          const {
            top, left, width, height
          } = window.getComputedStyle(this.$refs.wrapper, null)
          this.originalState = {
            top: Number(top.split('px')[0]) || 0,
            left: Number(left.split('px')[0]) || 0,
            width: Number(width.split('px')[0]) || 0,
            height: Number(height.split('px')[0]) || 0
          }
        }),
        map(() => this.documentMove$.pipe(takeUntil(this.documentUp$))),
        switchMap(move$ => merge(this.documentUp$.pipe(first()), move$)),
        withLatestFrom(this.all$, (events, { type, event }) => {
          const { pageX, pageY } = events
          // 鼠标事件类型
          const mouseType = events.type
          // 缩放类型
          let eventType
          // 缩放方向
          let direction = null
          // 缩放距离
          let distance = 0
          // 移动的相对位置
          let position = null
          // 横坐标方向移动距离
          const xDistance = pageX - event.pageX
          // 纵坐标方向移动距离
          const yDistance = pageY - event.pageY
          if (['tl', 'tr', 'br', 'bl'].includes(type)) {
            // 等比例缩放
            eventType = 'SCALE'
            // 对于等比例缩放，选择移动最小距离
            distance = Math.abs(xDistance) < Math.abs(yDistance) ? xDistance : yDistance
            switch (type) {
              case 'tl':
                if (xDistance >= 0 && yDistance >= 0) {
                  direction = 'REDUCE'
                } else if (xDistance < 0 && yDistance < 0) {
                  direction = 'EXPAND'
                }
                break

              case 'tr':
                if (xDistance >= 0 && yDistance <= 0) {
                  direction = 'EXPAND'
                } else if (xDistance < 0 && yDistance > 0) {
                  direction = 'REDUCE'
                }
                break

              case 'br':
                if (xDistance >= 0 && yDistance >= 0) {
                  direction = 'EXPAND'
                } else if (xDistance < 0 && yDistance < 0) {
                  direction = 'REDUCE'
                }
                break

              case 'bl':
                if (xDistance >= 0 && yDistance <= 0) {
                  direction = 'REDUCE'
                } else if (xDistance < 0 && yDistance > 0) {
                  direction = 'EXPAND'
                }
                break

              default:
                break
            }
          } else if (['tc', 'cr', 'bc', 'cl'].includes(type)) {
            // 单向缩放
            eventType = 'SINGLE'
            switch (type) {
              case 'tc':
                direction = yDistance >= 0 ? 'REDUCE' : 'EXPAND'
                distance = -yDistance
                break

              case 'cr':
                direction = xDistance >= 0 ? 'EXPAND' : 'REDUCE'
                distance = xDistance
                break

              case 'bc':
                direction = yDistance >= 0 ? 'EXPAND' : 'REDUCE'
                distance = yDistance
                break

              case 'cl':
                direction = xDistance >= 0 ? 'EXPAND' : 'REDUCE'
                distance = -xDistance
                break

              default:
                break
            }
          } else {
            // 移动
            eventType = 'MOVE'
            direction = 'ANY'
            position = {
              top: yDistance,
              left: xDistance
            }
          }
          return {
            type,
            eventType,
            direction,
            distance,
            position,
            mouseType
          }
        }),
        filter(({ direction }) => direction)
      )
      .subscribe((event) => {
        const mutation = {
          event,
          originalState: this.originalState
        }
        this.$emit('adjust', mutation)
        this.adjust({
          target: this.$refs.wrapper,
          mutation
        })
      })
    return {}
  },
  methods: {
    /**
     * 设置
     * @param display
     * @param top
     * @param left
     * @param width
     * @param height
     */
    setSize ({
      display, top, left, width, height
    }) {
      anime.set(this.$refs.wrapper, {
        display,
        top,
        left,
        width,
        height
      })
    }
  },
  beforeDestroy () {
    this.isSubscribed = false
  }
}
</script>

<style scoped lang="less">
.wrapper {
  top: 0;
  left: 0;
  height: 300px;
  width: 300px;
  position: absolute;
  box-sizing: border-box;
  padding: 5px;
  border: 1px solid #0098f7;
  z-index: 1000;
  display: none;

  &__mask {
    display: none;
    position: fixed;
    background: transparent;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
  }

  &__move {
    position: relative;
    height: 100%;
    width: 100%;
    cursor: move;
    z-index: 1000;
    pointer-events: auto;
  }

  &__handler {
    position: absolute;
    height: 10px;
    width: 10px;
    border-radius: 2px;
    background: #0098f7;
    z-index: 1000;

    &--tl {
      top: -5px;
      left: -5px;
      cursor: nwse-resize;
    }

    &--tc {
      top: -5px;
      left: calc(50% - 5px);
      cursor: ns-resize;
    }

    &--tr {
      top: -5px;
      right: -5px;
      cursor: nesw-resize;
    }

    &--cr {
      top: calc(50% - 5px);
      right: -5px;
      cursor: ew-resize;
    }

    &--br {
      bottom: -5px;
      right: -5px;
      cursor: nwse-resize;
    }

    &--bc {
      bottom: -5px;
      right: calc(50% - 5px);
      cursor: ns-resize;
    }

    &--bl {
      bottom: -5px;
      left: -5px;
      cursor: nesw-resize;
    }

    &--cl {
      top: calc(50% - 5px);
      left: -5px;
      cursor: ew-resize;
    }
  }
}
</style>
