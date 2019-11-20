/**
* 折线图
* Author: dong xing
* Date: 2019/11/20
* Time: 8:55 上午
* Email: dong.xing@outlook.com
*/
import echarts from 'echarts';
import anime from 'animejs';
import LinesConfig from '../config/defaultConfig/linesConfig';

export default class LineChart {
  constructor({ widget }) {
    this.container = document.getElementById(widget.widgetId);
    this.setContainer(widget);
    this.init(widget);
  }

  /**
   * 初始设置图表位置尺寸
   * @param config
   */
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

  /**
   * 图表resize
   */
  resize() {
    this.chart.resize();
  }

  /**
   * 重置图表默认配置
   */
  reset() {
    this.chart.setOption(LinesConfig);
  }

  /**
   * 映射成 echarts 配置项
   * @param commonConfig
   * @param proprietaryConfig
   */
  static mappingOption({ commonConfig, proprietaryConfig }) {
    const { backgroundColor, border, padding } = commonConfig;
    const { smooth, legend, lineStyle } = proprietaryConfig;
    const [top, right, bottom, left] = padding;
    return Object.assign({}, {
      legend: {
        ...legend,
        data: ['Test'],
      },
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
          name: 'Test',
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: smooth === 1,
          lineStyle,
        },
      ],
    });
  }

  /**
   * 设置新的配置项渲染图表
   * @param config widget 配置项
   */
  mergeOption(config) {
    // 向外暴露 echarts 配置
    this.chartConfig = LineChart.mappingOption(config);
    // 重新配置 echarts
    this.chart.setOption(this.chartConfig);
  }
}
