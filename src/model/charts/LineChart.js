import echarts from 'echarts';
import ChartConfig from './ChartConfig';

export default class LineChart extends ChartConfig {
  constructor({ container }) {
    super();
    this.container = container;
    this.init();
  }

  init() {
    this.chart = echarts.init(this.container, '', {
      width: 500,
      height: 500,
      renderer: 'svg',
    });
    this.chart.setOption(this.initConfig);
  }

  // eslint-disable-next-line class-methods-use-this
  mappingOption() {
  }

  mergeOption(config) {
    this.mappingOption();
    this.chart.setOption(config);
  }
}
