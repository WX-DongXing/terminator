<template>
  <div class="template">
    <div class="template__header">
      <p>组件库</p>
    </div>

    <div class="template__list">
      <div class="template__item" ref="item" v-for="(item, index) in templateList" :key="index">
        <a-icon :type="item.icon" />
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { fromEvent, merge } from 'rxjs';
import {
  map, takeWhile, takeUntil,
  tap, mergeMap, first, filter,
} from 'rxjs/operators';
import { mapState, mapMutations } from 'vuex';
import { ScreenMutations } from '@/store/modules/screen';

export default {
  name: 'Template',
  data: () => ({
    subscribed: true,
    cloneNode: null,
    xDistance: 0,
    yDistance: 0,
    screenUp$: null,
    templateList: [
      { name: '文本', icon: 'font-colors' },
      { name: '饼图', icon: 'pie-chart' },
      { name: '折线图', icon: 'line-chart' },
      { name: '柱形图', icon: 'bar-chart' },
      { name: '区域图', icon: 'area-chart' },
    ],
  }),
  subscriptions() {
    this.itemMouseDown$ = this.$fromDOMEvent('.template__item', 'mousedown');
    this.documentMove$ = fromEvent(document, 'mousemove');
    this.documentUp$ = fromEvent(document, 'mouseup');
    return {};
  },
  mounted() {
    this.screenUp$ = fromEvent(document.getElementsByClassName('view')[0], 'mouseup');

    this.itemMouseDown$
      .pipe(
        takeWhile(() => this.subscribed),
        tap((event) => {
          this.cloneNode = event.target.cloneNode(true);
          const { x, y } = event.target.getBoundingClientRect();
          const { pageX, pageY } = event;
          this.xDistance = Math.abs(pageX - x);
          this.yDistance = Math.abs(pageY - y);
          this.setStyle(this.cloneNode, 'position', 'fixed')
            .addStyle('margin', 0)
            .addStyle('top', `${y}px`)
            .addStyle('left', `${x}px`);
          document.body.append(this.cloneNode);
          event.preventDefault();
        }),
        map(() => this.documentMove$.pipe(takeUntil(this.documentUp$))),
        mergeMap(move$ => merge(this.documentUp$.pipe(first()), move$)),
        tap((event) => {
          const { pageX, pageY } = event;
          this.setStyle(this.cloneNode, 'top', `${pageY - this.yDistance}px`)
            .addStyle('left', `${pageX - this.xDistance}px`);
          if (this.isWithinScope(event)) {
            this.setStyle(this.cloneNode, 'transform', `scale(${this.screen.scale}`);
          } else {
            this.setStyle(this.cloneNode, 'transform', 'scale(1)');
          }
        }),
        filter(({ type }) => type === 'mouseup'),
      )
      .subscribe((event) => {
        if (this.isWithinScope(event)) {
          this.activeWidget({ widget: null });
          document.body.removeChild(this.cloneNode);
          this.screen.el.appendChild(this.cloneNode);
        } else {
          document.body.removeChild(this.cloneNode);
        }
      });
  },
  computed: {
    ...mapState('screen', ['screen']),
  },
  methods: {
    ...mapMutations('screen', {
      activeWidget: ScreenMutations.ACTIVE_WIDGET,
    }),
    setStyle(node, style, styleValue) {
      const targetNode = node;
      if (style && styleValue) {
        targetNode.style[style] = styleValue;
      }
      targetNode.addStyle = (styleName, styleNameValue) => {
        targetNode.style[styleName] = styleNameValue;
        return targetNode;
      };
      targetNode.addClass = (className) => {
        targetNode.className += ` ${className || 'clone'}`;
        return targetNode;
      };
      return targetNode;
    },
    isWithinScope({ pageX, pageY }) {
      const { xRange, yRange } = this.screen.area;
      return (pageX >= xRange.min && pageX <= xRange.max)
        && (pageY >= yRange.min && pageY <= yRange.max);
    },
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
    transition: transform 300ms cubic-bezier(0, 1, 0.85, 1);

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
