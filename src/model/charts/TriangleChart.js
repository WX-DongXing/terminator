/**
* 三角形
* Author: dong xing
* Date: 2020/3/24
* Time: 15:05
* Email: dong.xing@outlook.com
*/
import Chart from './index'

export default class TriangleChart extends Chart {
  constructor ({ widget }) {
    super({ widget })
  }

  /**
   * 尺寸
   */
  resize () {
    this.chart.resize()
    this.mergeOption(this.config)
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
