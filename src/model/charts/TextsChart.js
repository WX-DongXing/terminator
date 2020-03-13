/**
* 文本图
* Author: dong xing
* Date: 2020/3/12
* Time: 16:40
* Email: dong.xing@outlook.com
*/
import Chart from './index'

export default class TextsChart extends Chart {
  constructor ({ widget }) {
    super({ widget })
  }

  /**
   * 映射成 echarts 配置项
   */
  mappingOption ({ commonConfig, proprietaryConfig, dataConfig }) {
    const { grid } = commonConfig.getOption()
    const itemOptions = proprietaryConfig.getOption()
    return { grid, ...itemOptions }
  }
}
