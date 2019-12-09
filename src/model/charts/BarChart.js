/**
* 柱形图
* Author: dong xing
* Date: 2019/11/25
* Time: 4:59 下午
* Email: dong.xing@outlook.com
*/
import _ from 'lodash'
import Chart from './index'

export default class BarChart extends Chart {
  constructor ({ widget }) {
    super({ widget })
    this.type = 'bar'
  }

  /**
   * 映射成 echarts 配置项
   */
  // eslint-disable-next-line class-methods-use-this
  mappingOption ({ commonConfig, proprietaryConfig, dataConfig }) {
    const { backgroundColor, border, padding } = commonConfig
    const {
      barType, legend, itemStyle, barWidth
    } = proprietaryConfig
    const { sourceType, staticData } = dataConfig
    const [top, right, bottom, left] = padding
    const chartLegend = _.cloneDeep(legend)
    let xAxis = {}
    let yAxis = {}
    const bar = {
      type: 'bar',
      // 删除 color 对象，防止未格式化颜色影响图表颜色
      itemStyle: _.omit(_.cloneDeep(itemStyle), 'color')
    }

    const { type, color } = _.cloneDeep(itemStyle)
    let targetColor
    switch (type) {
      case 'single':
        targetColor = color
        break
      case 'combination':
        targetColor = [...color]
        // 单一项暂时注释
        // targetColor = (params) => {
        //   if (!params) {
        //     return null;
        //   }
        //   return [...color][params.dataIndex] || 'rgba(0, 0, 0, 1)';
        // };
        break
      case 'linear':
        targetColor = [...color].map(({ start, end }) => ({
          type: 'linear',
          x: 1,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: start
            },
            {
              offset: 1,
              color: end
            }
          ]
        }))
        // 单一项暂时注释
        // targetColor = (params) => {
        //   if (!params) {
        //     return null;
        //   }
        //   const defaultColor = { start: 'rgba(255,255,255,1)', end: 'rgba(0,0,0,1)' };
        //   const colors = _.isEmpty(color)
        //     ? new Array(11).fill(defaultColor)
        //     : [...color];
        //   return {
        //     type: 'linear',
        //     x: 1,
        //     y: 0,
        //     x2: 1,
        //     y2: 1,
        //     colorStops: [
        //       {
        //         offset: 0,
        //         color: (colors[params.dataIndex] || defaultColor).start,
        //       },
        //       {
        //         offset: 1,
        //         color: (colors[params.dataIndex] || defaultColor).end,
        //       },
        //     ],
        //   };
        // };
        break
      default:
        targetColor = null
        break
    }
    // Object.assign(bar.itemStyle, { color: targetColor });

    let series = []

    if (sourceType === 'static') {
      Object.assign(chartLegend, { legend: staticData.legend })
      series = staticData[barType === 'single' ? 'singleSeries' : 'multipleSeries'].map((item) => {
        Object.assign(item, bar, { barWidth })
        return item
      })
      xAxis = _.cloneDeep(staticData.xAxis)
      yAxis = _.cloneDeep(staticData.yAxis)
    }
    return Object.assign({}, {
      color: targetColor,
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
