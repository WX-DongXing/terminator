/**
* 时间日期
* Author: dong xing
* Date: 2020/3/28
* Time: 16:49
* Email: dong.xing@outlook.com
*/
import Chart from './index'

export default class DateTimeChart extends Chart {
  constructor ({ widget }) {
    super({ widget })
    this.getCurrentDate(widget)
  }

  getCurrentDate (widget) {
    this.mergeOption(widget.config)
    this.timer = setInterval(() => {
      this.mergeOption(widget.config)
    }, 1000)
  }

  /**
   * 映射成 echarts 配置项
   */
  mappingOption ({ commonConfig, proprietaryConfig, dataConfig }) {
    const { grid } = commonConfig.getOption()
    const itemOptions = proprietaryConfig.getOption()
    return { grid, ...itemOptions }
  }

  destroy () {
    clearInterval(this.timer)
  }
}
