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
      <div class="screen__size">
        <a-input
          type="number"
          addonBefore="宽"
          v-model="width"
          @change="() => change$.next({ type: 'width', value: Number(width) })" />
        <a-input
          type="number"
          addonBefore="高"
          v-model="height"
          @change="() => change$.next({ type: 'height', value: Number(height) })" />
      </div>
    </div>

    <!-- S 画板 -->
    <div class="page" ref="page" @click.self="() => select$.next({ el: 'page' })">

      <div class="gauge" ref="gauge"></div>
      <!-- / 标尺 -->

      <div class="view" ref="view" @click.self="() => select$.next({ el: 'view' })">

        <Widget
          v-for="widget in widgets"
          :widget="widget"
          :key="widget.widgetId"
          @select="() => select$.next({ el: 'widget', widget })"
        />
        <!-- / 部件渲染 -->

        <Wrapper ref="wrapper" />
      </div>
      <!-- / 视图 -->

    </div>
    <!-- E 画板 -->

    <div class="scale-bar">
      <a-tooltip placement="top">
        <template slot="title">
          自动比例：{{autoResize ? '已开启' : '已关闭'}}
        </template>
        <a-switch
          size="small"
          v-model="autoResize"
          @change="() => autoResize && change$.next({ type: 'resize' })" />
      </a-tooltip>
      <a-slider class="scale-bar__slider"
                @change="() => change$.next({ type: 'scale', value: scale })"
                :disabled="autoResize" :min="0" :max="1" :step="0.01" v-model="scale" />
      <p class="scale-bar__number">缩放比：{{this.scale.toFixed(2)}}</p>
    </div>
  </div>
</template>

<script>
import { fromEvent, merge, Subject } from 'rxjs';
import {
  startWith, mapTo, takeWhile,
} from 'rxjs/operators';
import { mapState, mapMutations } from 'vuex';
import anime from 'animejs';
import { ScreenMutations } from '@/store/modules/screen';
import { View } from '@/model/view';
import Wrapper from '@/components/wrapper/index.vue';
import ViewService from '../config/view';
import Widget from './widget/index.vue';

export default {
  name: 'Screen',
  components: {
    Wrapper,
    Widget,
  },
  subscriptions() {
    this.change$ = new Subject();
    this.select$ = new Subject();
    return {
    };
  },
  data: () => ({
    width: 1920,
    height: 1080,
    scale: 1,
    autoResize: true,
    subscribed: true,
  }),
  mounted() {
    const viewService = new ViewService();
    merge(
      fromEvent(window, 'resize').pipe(mapTo({ type: 'resize' })),
      this.change$,
      viewService.change$,
    )
      .pipe(
        takeWhile(() => this.subscribed),
        startWith({ type: 'resize' }),
      )
      .subscribe((event) => {
        // 设置缩放
        this.setScale(event);
        // 设置屏幕对象
        this.setView({
          view: new View(
            this.$refs.view,
            this.width,
            this.height,
            this.$refs.view.getBoundingClientRect(),
            this.scale,
          ),
        });
      });

    // 选择激活的部件
    this.select$
      .pipe(
        takeWhile(() => this.subscribed),
      )
      .subscribe(({ el, widget }) => {
        let activeWidget = null;
        switch (el) {
          case 'view':
            activeWidget = this.view;
            break;
          case 'page':
            activeWidget = null;
            break;
          case 'widget':
            activeWidget = widget;
            break;
          default:
            activeWidget = null;
            break;
        }
        if (el === 'widget') {
          const {
            width, height, x, y,
          } = widget;
          this.$refs.wrapper.setSize({
            display: 'block',
            width,
            height,
            top: y,
            left: x,
          });
        } else {
          this.$refs.wrapper.setSize({
            display: 'none',
          });
        }
        // 设置激活的部件
        this.activeWidget({
          widget: activeWidget,
        });
      });
  },
  computed: {
    ...mapState('screen', ['view', 'widgets']),
  },
  methods: {
    ...mapMutations('screen', {
      setView: ScreenMutations.SET_VIEW,
      activeWidget: ScreenMutations.ACTIVE_WIDGET,
    }),
    /**
     * 设置视图缩放
     * @param event
     */
    setScale(event) {
      const { width, height } = this.$refs.page.getBoundingClientRect();
      const xScale = ((width - 32) / this.width);
      const yScale = ((height - 32) / this.height);
      switch (event.type) {
        case 'resize':
          this.scale = Math.min(xScale, yScale);
          break;
        case 'scale':
          this.scale = event.value;
          break;
        default:
          this[event.type] = event.value;
          break;
      }
      anime({
        targets: this.$refs.view,
        width: this.width,
        height: this.height,
        scale: this.scale,
        duration: 150,
        easing: 'linear',
      });
      anime({
        targets: this.$refs.gauge,
        width: this.width * this.scale + 32,
        height: this.height * this.scale + 32,
        duration: 150,
        easing: 'linear',
      });
    },
  },
  beforeDestroy() {
    this.subscribed = false;
  },
};
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
    background: #fafafa;
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
  background: #fafafa;
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
