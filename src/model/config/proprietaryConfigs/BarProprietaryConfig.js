/**
 * 柱形图属性配置对象
 * Author: dong xing
 * Date: 2019/11/19
 * Time: 5:54 下午
 * Email: dong.xing@outlook.com
 */

import { ItemStyle, Legend } from './index'

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
    barWidth = 'auto'
  }) {
    this.barType = barType
    this.legend = new Legend(legend)
    this.itemStyle = new ItemStyle(itemStyle)
    this.barWidthType = barWidthType
    this.barWidth = barWidth
  }
}
