/**
* 折线图属性配置对象
* Author: dong xing
* Date: 2019/11/19
* Time: 5:54 下午
* Email: dong.xing@outlook.com
*/

import { LineStyle, Legend, XAixs, YAixs } from './index'

/**
 * 折现图专有属性配置
 */
export default class LinesProprietaryConfig {
  constructor ({
    smooth = true,
    lineStyle = {},
    legend = {},
    xAxis = {},
    yAxis = {}
  }) {
    // 是否平滑曲线显示
    this.smooth = smooth
    this.lineStyle = new LineStyle(lineStyle)
    this.legend = new Legend(legend)
    this.xAxis = new XAixs(xAxis)
    this.yAxis = new YAixs(yAxis)
  }
}
