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

export { Range, TopologyIcon }
