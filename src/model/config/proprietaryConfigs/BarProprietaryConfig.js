/**
 * 柱形图属性配置对象
 * Author: dong xing
 * Date: 2019/11/19
 * Time: 5:54 下午
 * Email: dong.xing@outlook.com
 */

import _ from 'lodash'
import { BarItemStyle, Legend, XAixs, YAixs } from './index'

/**
 * 折现图专有属性配置
 * @param barType 柱形图类型 'single' | 'multiple'
 * @param barWidthType 柱条宽度类型 'auto' | 'custom'
 * @param barWidth 柱条宽度 'auto' | Number
 */
export default class BarProprietaryConfig {
  constructor ({
    barType = 'single',
    itemStyle = {},
    legend = {},
    barWidthType = 'auto',
    barWidth = 'auto',
    xAxis = {},
    yAxis = {}
  }) {
    this.barType = barType
    this.legend = new Legend(legend)
    this.barItemStyle = new BarItemStyle(itemStyle)
    this.barWidthType = barWidthType
    this.barWidth = barWidth
    this.xAxis = new XAixs(xAxis)
    this.yAxis = new YAixs(yAxis)
  }

  /**
   * 获取柱形图专有配置
   */
  getOption () {
    return Object.assign(_.cloneDeep(this), {
      itemStyle: this.barItemStyle.getOption()
    })
  }
}
