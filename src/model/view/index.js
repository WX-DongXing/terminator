/**
* 视图对象
* Author: dong xing
* Date: 2020/3/10
* Time: 18:07
* Email: dong.xing@outlook.com
*/

import uuid from 'uuid/v4'
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
    gauge,
    parent,
    id = 'view-' + uuid(),
    name = '',
    widgets = [],
    scale = 1,
    cover = '',
    config = defaultConfig
  }) {
    this.el = document.getElementsByClassName('view')[0]
    this.gauge = gauge
    this.parent = parent
    this.id = id
    this.rect = this.el ? this.el.getBoundingClientRect() : { x: 0, y: 0 }
    this.name = name
    this.widgets = widgets
    this.scale = scale
    this.config = new Config(Object.assign(config, {
      type: 'View'
    }))
    // 视图有效区域
    this.area = {
      xRange: new Range(this.rect.x, this.rect.x + this.config.commonConfig.width * this.scale),
      yRange: new Range(this.rect.y, this.rect.y + this.config.commonConfig.height * this.scale)
    }
  }

  /**
   * 获取视图配置
   * @param params
   * @returns {{widgets: *[], config: Config}}
   */
  getOption (params) {
    const { id, name, config, widgets } = this
    return {
      id,
      name,
      config,
      widgets: widgets.map(widget => widget.getOption(params))
    }
  }
}
