import echarts from 'echarts';
import anime from 'animejs';
import ChartConfig from './ChartConfig';

export default class LineChart extends ChartConfig {
  constructor({ container, widget }) {
    super();
    this.container = container;
    this.setContainer(widget);
    this.init(widget);
  }

  // 设置图表位置尺寸
  setContainer({
    width, height, top, left, zIndex,
  }) {
    anime.set(this.container, {
      width,
      height,
      top,
      left,
      zIndex,
    });
  }

  /**
   * 初始化图表
   * @param widget
   */
  init(widget) {
    this.chart = echarts.init(this.container, '', {
      renderer: 'svg',
    });
    // 初始化没有配置项的情况下使用默认配置
    if (!widget.config) {
      this.chart.setOption(this.initConfig);
      return;
    }
    this.mergeOption(widget.config);
  }

  // 图表resize
  resize() {
    this.chart.resize();
  }

  // eslint-disable-next-line class-methods-use-this
  mappingOption() {
  }

  mergeOption(config) {
    this.mappingOption();
    this.chart.setOption(config);
  }
}
