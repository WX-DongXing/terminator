/**
* 折线图
* Author: dong xing
* Date: 2019/11/20
* Time: 8:55 上午
* Email: dong.xing@outlook.com
*/
import echarts from 'echarts'
import anime from 'animejs'
import _ from 'lodash'

export default class LineChart {
  constructor ({ widget }) {
    this.container = document.getElementById(widget.widgetId)
    this.setContainer(widget)
    this.init(widget)
  }

  /**
   * 初始设置图表位置尺寸
   * @param config
   */
  setContainer ({ config }) {
    const {
      width, height, top, left, zIndex
    } = config.commonConfig
    anime.set(this.container, {
      width,
      height,
      top,
      left,
      zIndex
    })
  }

  /**
   * 初始化图表
   * @param widget
   */
  init ({ config }) {
    this.chart = echarts.init(this.container, '', {
      renderer: 'svg'
    })
    this.mergeOption(config)
  }

  /**
   * 图表resize
   */
  resize () {
    this.chart.resize()
  }

  /**
   * 映射成 echarts 配置项
   * @param commonConfig 公共配置
   * @param proprietaryConfig 专有配置
   * @param dataConfig 数据配置
   */
  static mappingOption ({ commonConfig, proprietaryConfig, dataConfig }) {
    const { backgroundColor, border, padding } = commonConfig
    const { smooth, legend, lineStyle } = proprietaryConfig
    const { sourceType, staticData } = dataConfig
    const [top, right, bottom, left] = padding
    const chartLegend = _.cloneDeep(legend)
    const line = {
      type: 'line',
      smooth: smooth === 1,
      lineStyle
    }
    let xAxis = {}
    let yAxis = {}
    let series = []

    if (sourceType === 'static') {
      Object.assign(chartLegend, { data: staticData.legend })
      series = staticData.series.map((item) => {
        Object.assign(item, line)
        return item
      })
      xAxis = _.cloneDeep(staticData.xAxis)
      yAxis = _.cloneDeep(staticData.yAxis)
    }

    return Object.assign({}, {
      legend: {
        ...chartLegend
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
          borderWidth: border.width
        },
        {
          show: true,
          top: 30 + top,
          right: 30 + right,
          bottom: 30 + bottom,
          left: 30 + left,
          borderWidth: 0,
          backgroundColor: 'transparent'
        }
      ],
      xAxis: [{
        gridIndex: 1,
        ...xAxis
      }],
      yAxis: [{
        gridIndex: 1,
        ...yAxis
      }],
      series
    })
  }

  /**
   * 设置新的配置项渲染图表
   * @param config widget 配置项
   */
  mergeOption (config) {
    // 向外暴露 echarts 配置
    this.chartConfig = LineChart.mappingOption(config)
    // 如果数据为空则清空图表
    if (_.isEmpty(this.chartConfig.series)) {
      this.chart.clear()
    }
    // 重新配置图表
    this.chart.setOption(this.chartConfig)
  }
}
