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
    <div class="page" ref="page">

      <div class="gauge" ref="gauge"></div>
      <!-- / 标尺 -->

      <div class="view" ref="view">
        <Wrapper />
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
      <a-slider class="scale-bar__slider" @change="() => slider$.next(scale)"
                :disabled="autoResize" :min="0" :max="1" :step="0.01" v-model="scale" />
      <p class="scale-bar__number">缩放比：{{this.scale.toFixed(2)}}</p>
    </div>
  </div>
</template>

<script>
import { fromEvent, merge, Subject } from 'rxjs';
import {
  startWith, mapTo, takeWhile, pluck,
  map,
} from 'rxjs/operators';
import { mapState, mapMutations } from 'vuex';
import anime from 'animejs';
import { ScreenMutations } from '@/store/modules/screen';
import { View } from '@/model/view';
import Wrapper from '@/components/wrapper/index.vue';
import ViewService from '../config/view';

export default {
  name: 'Screen',
  components: {
    Wrapper,
  },
  domStreams: ['widthChange$', 'heightChange$'],
  subscriptions() {
    this.slider$ = new Subject();
    this.change$ = new Subject();
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
      this.slider$.pipe(map(scale => ({ type: 'scale', value: scale }))),
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

    fromEvent(document, 'click')
      .pipe(
        takeWhile(() => this.subscribed),
        pluck('target', 'classList'),
        map(list => [...list]),
      )
      .subscribe((classList) => {
        if (classList.includes('view')) {
          // 设置当前激活部件为当前画板视图
          this.activeWidget({
            widget: this.view,
          });
        } else if (classList.includes('page')) {
          this.activeWidget({
            widget: null,
          });
        }
      });
  },
  computed: {
    ...mapState('screen', ['view']),
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
