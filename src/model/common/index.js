/**
* 通用对象
* Author: dong xing
* Date: 2020/1/16
* Time: 4:54 下午
* Email: dong.xing@outlook.com
*/

import _ from 'lodash'

/**
 * 数据范围
 */
class Range {
  constructor (min, max) {
    this.min = min
    this.max = max
  }
}

/**
 * 拓扑图标
 */
class TopologyIcon {
  constructor ({
    show = false,
    position = 'inside',
    name = 'network',
    width = 64,
    height = 64,
    img = ''
  }) {
    this.show = show
    this.position = position
    this.name = name
    this.width = width
    this.height = height
    this.img = img
  }
}

/**
 * 边框圆角
 */
class BorderRadius {
  constructor ({
    borderTopLeftRadius = 0,
    borderTopRightRadius = 0,
    borderBottomRightRadius = 0,
    borderBottomLeftRadius = 0
  }) {
    this.borderTopLeftRadius = borderTopLeftRadius
    this.borderTopRightRadius = borderTopRightRadius
    this.borderBottomRightRadius = borderBottomRightRadius
    this.borderBottomLeftRadius = borderBottomLeftRadius
  }
}

/**
 * 边框
 * @param style 边框类型 ’solid‘ | 'dashed' | 'dotted'
 * @param color 边框颜色
 * @param width 边框宽度
 * @param borderRadius 边框圆角
 */
class Border {
  constructor ({
    borderStyle = 'solid',
    borderColor = '#333',
    borderWidth = 0,
    borderRadius = {}
  }) {
    this.borderStyle = borderStyle
    this.borderColor = borderColor
    this.borderWidth = borderWidth
    this.borderRadius = new BorderRadius(borderRadius)
  }

  /**
   * 获取边框配置
   */
  getOption () {
    return Object.assign(_.omit(_.cloneDeep(this), 'borderRadius'), {
      ...this.borderRadius
    })
  }
}

export { Range, TopologyIcon, Border }
