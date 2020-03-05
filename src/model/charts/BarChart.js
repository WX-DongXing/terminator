/**
* 柱形图
* Author: dong xing
* Date: 2019/11/25
* Time: 4:59 下午
* Email: dong.xing@outlook.com
*/
import Chart from './index'

export default class BarChart extends Chart {
  constructor ({ widget }) {
    super({ widget })
  }

  /**
   * 映射成 echarts 配置项
   */
  // eslint-disable-next-line class-methods-use-this
  mappingOption ({ commonConfig, proprietaryConfig, dataConfig }) {
    const { grid } = commonConfig.getOption()
    const { barType, legend, itemStyle, barWidth, xAxis, yAxis } = proprietaryConfig.getOption()
    const { sourceType, staticData } = dataConfig
    const { color, ...otherItemStyle } = itemStyle
    let series = []

    // 总体配置
    const option = { color, grid, legend, series, xAxis: [xAxis], yAxis: [yAxis] }

    const bar = {
      type: 'bar',
      // 剔除 color 对象，防止未格式化颜色影响图表颜色
      itemStyle: otherItemStyle
    }

    if (sourceType === 'static') {
      series = staticData[barType === 'single' ? 'singleSeries' : 'multipleSeries'].map((item) => {
        Object.assign(item, bar, { barWidth })
        return item
      })
      const { legend: staticLegend, xAxis: staticXAxis, yAxis: staticYAxis } = staticData
      Object.assign(option, {
        legend: Object.assign(legend, staticLegend),
        xAxis: Object.assign(xAxis, staticXAxis),
        yAxis: Object.assign(yAxis, staticYAxis),
        series
      })
    }
    return option
  }
}
