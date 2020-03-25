/**
* 图片专有配置
* Author: dong xing
* Date: 2020/3/25
* Time: 10:03
* Email: dong.xing@outlook.com
*/

import { ImageGraphic } from './index'

export default class ImageProprietaryConfig {
  constructor ({
    graphic = {}
  }) {
    this.graphic = new ImageGraphic(graphic)
  }

  getOption (chart, padding) {
    return this.graphic.getOption(chart, padding)
  }
}
