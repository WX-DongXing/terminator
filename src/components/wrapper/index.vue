<template>
  <div class="wrapper">
    <div class="wrapper__handler wrapper__handler--tl"></div>
    <div class="wrapper__handler wrapper__handler--tc"></div>
    <div class="wrapper__handler wrapper__handler--tr"></div>
    <div class="wrapper__handler wrapper__handler--cc"></div>
    <div class="wrapper__handler wrapper__handler--br"></div>
    <div class="wrapper__handler wrapper__handler--bc"></div>
    <div class="wrapper__handler wrapper__handler--bl"></div>
    <div class="wrapper__handler wrapper__handler--cl"></div>
    <slot></slot>
  </div>
</template>

<script>
import { fromEvent, merge } from 'rxjs';
import {
  takeWhile, takeUntil, switchMap,
  tap, map, withLatestFrom,
} from 'rxjs/operators';

export default {
  name: 'Wrapper',
  data: () => ({
    subscribed: true,
  }),
  subscriptions() {
    this.documentMove$ = fromEvent(document, 'mousemove');
    this.documentUp$ = fromEvent(document, 'mouseup');
    this.tl$ = this.$fromDOMEvent('.wrapper__handler--tl', 'mousedown').pipe(
      map(event => ({ type: 'tl', event })),
    );
    this.tc$ = this.$fromDOMEvent('.wrapper__handler--tc', 'mousedown').pipe(
      map(event => ({ type: 'tc', event })),
    );
    this.tr$ = this.$fromDOMEvent('.wrapper__handler--tr', 'mousedown').pipe(
      map(event => ({ type: 'tr', event })),
    );
    this.cc$ = this.$fromDOMEvent('.wrapper__handler--cc', 'mousedown').pipe(
      map(event => ({ type: 'cc', event })),
    );
    this.br$ = this.$fromDOMEvent('.wrapper__handler--br', 'mousedown').pipe(
      map(event => ({ type: 'br', event })),
    );
    this.bc$ = this.$fromDOMEvent('.wrapper__handler--bc', 'mousedown').pipe(
      map(event => ({ type: 'bc', event })),
    );
    this.bl$ = this.$fromDOMEvent('.wrapper__handler--bl', 'mousedown').pipe(
      map(event => ({ type: 'bl', event })),
    );
    this.cl$ = this.$fromDOMEvent('.wrapper__handler--cl', 'mousedown').pipe(
      map(event => ({ type: 'cl', event })),
    );

    this.all$ = merge(
      this.tl$, this.tc$, this.tr$, this.cc$,
      this.br$, this.bc$, this.bl$, this.cl$,
    );

    this.all$
      .pipe(
        takeWhile(() => this.subscribed),
        tap(({ event }) => event.preventDefault()),
        switchMap(() => this.documentMove$.pipe(takeUntil(this.documentUp$))),
        withLatestFrom(this.all$, ({ pageX, pageY }, { type, event }) => {
          // 等比例缩放
          if (['tl', 'tr', 'br', 'bl'].includes(type)) {
            // 横坐标方向移动距离
            const xDistance = pageX - event.pageX;
            // 纵坐标方向移动距离
            const yDistance = pageY - event.pageY;
            // 对于等比例缩放，选择移动最小距离
            const minDistance = Math.min(Math.abs(xDistance), Math.abs(yDistance));
            if (type === 'tl') {
              if (xDistance >= 0 && yDistance >= 0) {
                console.log('s: ', minDistance);
              } else if (xDistance < 0 && yDistance < 0) {
                console.log('b: ', minDistance);
              }
            }
          } else {
            console.log('none');
          }
          return type;
        }),
      )
      .subscribe(res => console.log(res));
    return {};
  },
  beforeDestroy() {
    this.subscribed = false;
  },
};
</script>

<style scoped lang="less">
.wrapper {
  top: 100px;
  left: 100px;
  height: 500px;
  width: 500px;
  position: absolute;
  box-sizing: border-box;
  padding: 1px;
  border: 1px solid #0098f7;

  &__handler {
    position: absolute;
    height: 10px;
    width: 10px;
    border-radius: 2px;
    background: #0098f7;

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

    &--cc {
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
