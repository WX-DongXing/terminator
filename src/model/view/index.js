import Config from '../config'
import { Range } from '../common'

// 默认配置
const defaultConfig = {
  commonConfig: {
    width: 1920,
    height: 1080
  }
}

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
    widgets = [],
    scale = 1,
    cover = '',
    config = defaultConfig
  }) {
    this.el = el
    this.gauge = gauge
    this.parent = parent
    this.rect = el.getBoundingClientRect()
    this.widgets = widgets
    this.scale = scale
    this.cover = cover
    this.config = new Config(Object.assign(config, {
      type: 'ViewConfig'
    }))
    // 视图有效区域
    this.area = {
      xRange: new Range(this.rect.x, this.rect.x + this.config.commonConfig.width * this.scale),
      yRange: new Range(this.rect.y, this.rect.y + this.config.commonConfig.height * this.scale)
    }
  }

  /**
   * 获取视图配置
   * @returns {{widgets: *[], config: Config}}
   */
  getOption () {
    const { config, widgets } = this
    return {
      config,
      widgets: widgets.map(item => {
        // 删除部件渲染对象，以持久化数据
        delete item.render
        return item
      })
    }
  }
}
