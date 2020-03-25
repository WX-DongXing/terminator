/**
* 三角形专有配置
* Author: dong xing
* Date: 2020/3/24
* Time: 15:09
* Email: dong.xing@outlook.com
*/

import { TriangleGraphic } from './index'

export default class TriangleChartProprietaryConfig {
  constructor ({
    graphic = {}
  }) {
    this.graphic = new TriangleGraphic(graphic)
  }

  getOption (chart, padding) {
    return this.graphic.getOption(chart, padding)
  }
}
