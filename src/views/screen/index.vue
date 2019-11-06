<template>
  <div class="screen">
    <div class="screen__header">

    </div>
    <div class="page" ref="page">
      <div class="view" ref="view">
        <div id="chart"></div>
      </div>
    </div>
    <div class="scale-bar">
      <a-tooltip placement="top">
        <template slot="title">
          自动比例：{{autoResize ? '已开启' : '已关闭'}}
        </template>
        <a-switch size="small" v-model="autoResize" @change="() => autoResize && this.setScale()" />
      </a-tooltip>
      <a-slider class="scale-bar__slider" @change="(scale) => slider$.next(scale)"
                :disabled="autoResize" :min="0" :max="1" :step="0.01" v-model="scale" />
      <p class="scale-bar__number">缩放比：{{this.scale}}</p>
    </div>
  </div>
</template>

<script>
import { fromEvent, merge, Subject } from 'rxjs';
import { startWith, mapTo, takeWhile } from 'rxjs/operators';
import { mapState, mapMutations } from 'vuex';
import G2 from '@antv/g2';
import { ScreenMutations } from '@/store/modules/screen';
import { Screen } from '@/views/model';

export default {
  name: 'Screen',
  subscriptions() {
    this.slider$ = new Subject();
    return {
    };
  },
  data: () => ({
    autoResize: true,
    scale: 1,
    subscribed: true,
  }),
  mounted() {
    const data = [{
      year: '1951 年',
      sales: 38,
    }, {
      year: '1952 年',
      sales: 52,
    }, {
      year: '1956 年',
      sales: 61,
    }, {
      year: '1957 年',
      sales: 145,
    }, {
      year: '1958 年',
      sales: 48,
    }, {
      year: '1959 年',
      sales: 38,
    }, {
      year: '1960 年',
      sales: 38,
    }, {
      year: '1962 年',
      sales: 38,
    }];
    const chart = new G2.Chart({
      container: 'chart',
      forceFit: true,
      height: 500,
    });
    chart.source([]);
    chart.interval().position('year*sales');
    chart.render();

    setTimeout(() => {
      chart.changeData(data);
    }, 2000);

    this.resize$ = merge(
      fromEvent(window, 'resize').pipe(mapTo('')),
      this.slider$,
    )
      .pipe(
        takeWhile(() => this.subscribed),
        startWith(''),
      )
      .subscribe((scale) => {
        if (scale) {
          this.scale = scale;
        }
        this.setScale(scale);
        // 设置屏幕对象
        this.setScreen({
          screen: new Screen(this.$refs.view, this.$refs.view.getBoundingClientRect(), this.scale),
        });
      });
  },
  computed: {
    ...mapState('screen', ['screen']),
  },
  methods: {
    ...mapMutations('screen', {
      setScreen: ScreenMutations.SET_SCREEN,
    }),
    /**
     * 设置视图缩放
     * @param scale
     */
    setScale(scale) {
      if (!scale) {
        const { width, height } = this.$refs.page.getBoundingClientRect();
        const xScale = ((width - 32) / 1920).toFixed(2);
        const yScale = ((height - 32) / 1080).toFixed(2);
        this.scale = Math.min(xScale, yScale);
      } else {
        this.scale = scale;
      }
      this.$refs.view.style.transform = `scale(${this.scale})`;
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
    height: 48px;
    background: #fafafa;
    border-bottom: 1px solid rgba(0, 0, 0, .3);
  }
}

.page {
  height: 100%;
  box-sizing: border-box;
  padding: 16px;
  overflow: auto;
  background: #f1f1f1;
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
  background: white;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2),
  0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
  transform-origin: 0 0;
}
</style>
