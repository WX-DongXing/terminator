
import Chart from './index'

export default class RectChart extends Chart {
  constructor ({ widget }) {
    super({ widget })
    this.config = widget.config
  }

  resize (config) {
    if (config) {
      this.chart.resize()
      this.mergeOption(config)
    }
  }

  /**
   * 映射成 echarts 配置项
   */
  mappingOption ({ commonConfig, proprietaryConfig }) {
    const padding = commonConfig.getPadding()
    const graphic = proprietaryConfig.getOption(this.chart, padding)
    return { graphic }
  }
}
