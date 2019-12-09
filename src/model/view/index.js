import Config from '../config'

class Range {
  constructor (min, max) {
    this.min = min
    this.max = max
  }
}

export default class View {
  constructor ({
    el, width, height, scale, parent, backgroundColor
  }) {
    this.el = el
    this.rect = el.getBoundingClientRect()
    this.area = {
      xRange: new Range(this.rect.x, this.rect.x + width * scale),
      yRange: new Range(this.rect.y, this.rect.y + height * scale)
    }
    this.scale = scale
    this.parent = parent
    this.config = new Config({
      type: 'ViewConfig',
      commonConfig: {
        height,
        width,
        backgroundColor: backgroundColor || 'rgba(255,255,255,1)'
      }
    })
  }
}
