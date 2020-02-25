import Config from '../config'
import { Range } from '../common'

/**
 * el 当前dom元素
 * gauge 视图标尺dom元素
 * parent 当前dom元素父级元素
 */
export default class View {
  constructor ({
    el,
    gauge,
    parent,
    width = 1920,
    height = 1080,
    widgets = [],
    scale,
    proprietaryConfig = {}
  }) {
    this.el = el
    this.gauge = gauge
    this.parent = parent
    this.rect = el.getBoundingClientRect()
    this.area = {
      xRange: new Range(this.rect.x, this.rect.x + width * scale),
      yRange: new Range(this.rect.y, this.rect.y + height * scale)
    }
    this.widgets = widgets
    this.scale = scale
    this.config = new Config({
      type: 'ViewConfig',
      commonConfig: {
        height,
        width
      },
      proprietaryConfig: proprietaryConfig
    })
  }
}
