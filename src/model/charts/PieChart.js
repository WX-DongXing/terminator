import Chart from './index'

export default class PieChart extends Chart {
  constructor ({ widget }) {
    super({ widget })
  }

  mappingOption ({ commonConfig, proprietaryConfig, dataConfig }) {
    const { grid } = commonConfig.getOption()
    const {
      legend, radius, roseType,
      itemStyle: { color, ...otherItemStyle }
    } = proprietaryConfig.getOption()
    const { sourceType, staticDataConfig: { staticData } } = dataConfig
    let series = []

    // 总体配置
    const option = { color, grid, legend, series }

    const pie = {
      type: 'pie',
      radius,
      roseType,
      itemStyle: otherItemStyle
    }

    if (sourceType === 'static') {
      series = staticData.series.map((item) => {
        Object.assign(item, pie)
        return item
      })
      const { legend: staticLegend } = staticData
      Object.assign(option, {
        legend: Object.assign(legend, staticLegend),
        series
      })
    }
    console.log(option)
    return option
  }
}
