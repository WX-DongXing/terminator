<template>
  <div class="template">
    <div class="template__header">
      <p>组件库</p>
    </div>

    <div class="template__list">
      <div class="template__item" v-stream:mousedown="{ subject: itemMouseDown$, data: item }"
           ref="item" v-for="(item, index) in templateList" :key="index">
        <a-icon :type="item.icon" />
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { fromEvent, merge, Subject } from 'rxjs';
import {
  map, takeWhile, takeUntil,
  tap, switchMap, first, filter, withLatestFrom,
} from 'rxjs/operators';
import { mapState, mapMutations } from 'vuex';
import anime from 'animejs';
import { ScreenMutations } from '@/store/modules/screen';

export default {
  name: 'Template',
  data: () => ({
    subscribed: true,
    cloneNode: null,
    xDistance: 0,
    yDistance: 0,
    viewUp$: null,
    templateList: [
      {
        name: '文本', icon: 'font-colors', belong: 'element', type: 'text', width: 300, height: 48,
      },
      {
        name: '饼图', icon: 'pie-chart', belong: 'chart', type: 'pie', width: 300, height: 300,
      },
      {
        name: '折线图', icon: 'line-chart', belong: 'chart', type: 'line', width: 500, height: 400,
      },
      {
        name: '柱形图', icon: 'bar-chart', belong: 'chart', type: 'bar', width: 500, height: 400,
      },
      {
        name: '区域图', icon: 'area-chart', belong: 'chart', type: 'area', width: 500, height: 400,
      },
    ],
  }),
  subscriptions() {
    // 模板 mousedown 事件
    this.itemMouseDown$ = new Subject();
    // 全局 mousemove 事件
    this.documentMove$ = fromEvent(document, 'mousemove');
    // 全局 mouseup 事件
    this.documentUp$ = fromEvent(document, 'mouseup');
    return {};
  },
  mounted() {
    this.viewUp$ = fromEvent(document.getElementsByClassName('view')[0], 'mouseup');

    // 模板移动至视图操作
    this.itemMouseDown$
      .pipe(
        takeWhile(() => this.subscribed),
        tap(({ event }) => {
          this.cloneNode = event.target.cloneNode(true);
          const { x, y } = event.target.getBoundingClientRect();
          const { pageX, pageY } = event;
          this.xDistance = Math.abs(pageX - x);
          this.yDistance = Math.abs(pageY - y);
          anime.set(this.cloneNode, {
            position: 'fixed',
            margin: 0,
            top: y,
            left: x,
          });
          document.body.append(this.cloneNode);
          event.preventDefault();
        }),
        map(() => this.documentMove$.pipe(takeUntil(this.documentUp$))),
        switchMap(move$ => merge(this.documentUp$.pipe(first()), move$)),
        withLatestFrom(this.itemMouseDown$, (event, { data }) => ({ event, data })),
        tap(({ event, data }) => {
          const { pageX, pageY } = event;
          const { width, height } = data;
          // 设置克隆节点的位置
          anime.set(this.cloneNode, {
            transformOrigin: '0 0',
            top: pageY - this.yDistance,
            left: pageX - this.xDistance,
          });
          // 设置克隆节点在视图区域的动画效果
          anime({
            targets: this.cloneNode,
            width: this.isWithinScope(event) ? width : 96,
            height: this.isWithinScope(event) ? height : 96,
            scale: this.isWithinScope(event) ? this.view.scale : 1,
            duration: 35,
            easing: 'linear',
          });
        }),
        filter(({ event }) => event.type === 'mouseup'),
      )
      .subscribe(({ event, data }) => {
        if (this.isWithinScope(event)) {
          this.activeWidget({ widget: data });
          document.body.removeChild(this.cloneNode);
        } else {
          document.body.removeChild(this.cloneNode);
        }
      });
  },
  computed: {
    ...mapState('screen', ['view']),
  },
  methods: {
    ...mapMutations('screen', {
      activeWidget: ScreenMutations.ACTIVE_WIDGET,
    }),
    isWithinScope({ pageX, pageY }) {
      const { xRange, yRange } = this.view.area;
      return (pageX >= xRange.min && pageX <= xRange.max)
        && (pageY >= yRange.min && pageY <= yRange.max);
    },
  },
  beforeDestroy() {
    this.subscribed = false;
  },
};
</script>

<style scoped lang="less">
.template {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  background: #fafafa;

  &__header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    height: 48px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.23);

    p {
      margin: 0;
      padding: 0 16px;
    }
  }

  &__list {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    box-sizing: border-box;
    padding-left: 16px;
  }

  &__item {
    flex: none;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    height: 96px;
    width: 96px;
    margin: 16px 16px 0 0;
    background: white;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
      0 1px 3px 0 rgba(0, 0, 0, 0.12);
    /*transition: transform, width, height 1350ms cubic-bezier(0, 1, 0.85, 1);*/

    i {
      pointer-events: none;
      font-size: 32px;
    }

    p {
      pointer-events: none;
      color: #757575;
      margin: 8px 0 0 0;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
.clone {
  /*pointer-events: none !important;*/
}
</style>
