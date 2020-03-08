/**
* 通用对象
* Author: dong xing
* Date: 2020/1/16
* Time: 4:54 下午
* Email: dong.xing@outlook.com
*/

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
 * 边框类型
 */
class BorderTypeOption {
  constructor (name, value) {
    this.name = name
    this.value = value
  }
}

/**
 * 边框
 */
class Border {
  constructor ({
    type = 'solid',
    color = '#333',
    width = 0
  }) {
    this.type = type
    this.typeOptions = [
      new BorderTypeOption('无边框', 'none'),
      new BorderTypeOption('直线', 'solid')
    ]
    this.color = color
    this.width = width
  }
}

export { Range, TopologyIcon, Border }
