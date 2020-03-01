/**
* 折线图
* Author: dong xing
* Date: 2019/11/20
* Time: 8:55 上午
* Email: dong.xing@outlook.com
*/

import _ from 'lodash'
import Chart from './index'

export default class LineChart extends Chart {
  constructor ({ widget }) {
    super({ widget })
  }

  /**
   * 映射成 echarts 配置项
   * @param commonConfig 公共配置
   * @param proprietaryConfig 专有配置
   * @param dataConfig 数据配置
   */
  mappingOption ({ commonConfig, proprietaryConfig, dataConfig }) {
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
}
