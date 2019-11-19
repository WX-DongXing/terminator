import echarts from 'echarts';
import anime from 'animejs';
import LinesConfig from '../config/defaultConfig/linesConfig';

export default class LineChart {
  constructor({ widget }) {
    this.container = document.getElementById(widget.widgetId);
    this.setContainer(widget);
    this.init(widget);
  }

  // 设置图表位置尺寸
  setContainer({ config }) {
    const {
      width, height, top, left, zIndex,
    } = config.commonConfig;
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
  init({ config }) {
    this.chart = echarts.init(this.container, '', {
      renderer: 'svg',
    });
    this.mergeOption(config);
  }

  // 图表resize
  resize() {
    this.chart.resize();
  }

  // 重置图表默认配置
  reset() {
    this.chart.setOption(LinesConfig);
  }

  // 映射成 echarts 配置项
  static mappingOption({ commonConfig }) {
    const { backgroundColor, border, padding } = commonConfig;
    const [top, right, bottom, left] = padding;
    return Object.assign({}, {
      grid: [
        {
          show: true,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor,
          borderColor: border.color,
          borderWidth: border.width,
        },
        {
          show: true,
          top: 25 + top,
          right: 25 + right,
          bottom: 25 + bottom,
          left: 25 + left,
          borderWidth: 0,
          backgroundColor: 'transparent',
        },
      ],
      xAxis: [{
        gridIndex: 1,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      }],
      yAxis: [{
        gridIndex: 1,
      }],
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true,
        },
      ],
    });
  }

  // 设置新的配置项渲染图表
  mergeOption(config) {
    this.chartConfig = LineChart.mappingOption(config);
    this.chart.setOption(this.chartConfig);
  }
}
