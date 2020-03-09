/**
* 折线图属性配置对象
* Author: dong xing
* Date: 2019/11/19
* Time: 5:54 下午
* Email: dong.xing@outlook.com
*/

import { LineStyle, Legend, XAixs, YAixs, ItemStyle } from './index'

/**
 * 折现图专有属性配置
 * echarts 官方折线配置 https://www.echartsjs.com/zh/option.html#series-line
 * @param smooth 是否平滑曲线显示
 * @param showSymbol 是否显示标志点
 * @param symbol 标志点形状 'emptyCircle', 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
 * @param symbolSize 标志点大小
 * @param symbolRotate 标志点旋转角度
 */
export default class LinesProprietaryConfig {
  constructor ({
    smooth = true,
    showSymbol = true,
    symbol = 'emptyCircle',
    symbolSize = 4,
    symbolRotate = 0,
    lineStyle = {},
    itemStyle = {},
    legend = {},
    xAxis = {},
    yAxis = {}
  }) {
    // 是否平滑曲线显示
    this.smooth = smooth
    this.showSymbol = showSymbol
    this.symbol = symbol
    this.symbolSize = symbolSize
    this.symbolRotate = symbolRotate
    this.lineStyle = new LineStyle(lineStyle)
    this.itemStyle = new ItemStyle(itemStyle)
    this.legend = new Legend(legend)
    this.xAxis = new XAixs(xAxis)
    this.yAxis = new YAixs(yAxis)
  }
}
