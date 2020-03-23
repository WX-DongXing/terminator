/**
* 矩形专有配置
* Author: dong xing
* Date: 2020/3/19
* Time: 16:50
* Email: dong.xing@outlook.com
*/

import { RectGraphic } from './index'

export default class RectProprietaryConfig {
  constructor ({
    colorMode = 'single',
    graphic = {}
  }) {
    this.graphic = new RectGraphic(graphic)
  }

  getOption (chart, padding) {
    return this.graphic.getOption(chart, padding)
  }
}
