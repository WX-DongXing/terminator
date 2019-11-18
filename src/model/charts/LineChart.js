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
          top,
          right,
          bottom,
          left,
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
      }],
      yAxis: [{
        gridIndex: 1,
      }],
    });
  }

  // 设置新的配置项渲染图表
  mergeOption(config) {
    this.chartConfig = LineChart.mappingOption(config);
    this.chart.setOption(this.chartConfig);
  }
}
