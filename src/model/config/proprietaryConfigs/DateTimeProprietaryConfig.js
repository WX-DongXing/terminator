/**
* 时间日期专有配置
* Author: dong xing
* Date: 2020/3/28
* Time: 16:50
* Email: dong.xing@outlook.com
*/

import _ from 'lodash'
import { DateTimeTitle } from './index'

// 默认轴线配置，不显示轴线
const defaultAxis = {
  show: false
}

export default class TextsProprietaryConfig {
  constructor ({
    title = {},
    xAxis = defaultAxis,
    yAxis = defaultAxis
  }) {
    this.title = new DateTimeTitle(title)
    this.xAxis = xAxis
    this.yAxis = yAxis
  }

  /**
   * 获取时间日期专有配置
   */
  getOption () {
    return Object.assign(_.cloneDeep(this), {
      title: this.title.getOption()
    })
  }
}
