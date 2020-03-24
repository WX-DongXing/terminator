/**
* 圆形专有配置
* Author: dong xing
* Date: 2020/3/24
* Time: 10:59
* Email: dong.xing@outlook.com
*/

import { CircleGraphic } from './index'

export default class CircleProprietaryConfig {
  constructor ({
    graphic = {}
  }) {
    this.graphic = new CircleGraphic(graphic)
  }

  getOption (chart, padding) {
    return this.graphic.getOption(chart, padding)
  }
}
