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

/**
 * 通用配置
 */
export default class CommonConfig {
  constructor ({
    width = 0,
    height = 0,
    top = 0,
    left = 0,
    zIndex = 0,
    padding = [0, 0, 0, 0],
    backgroundColor = 'rgba(255,255,255,1)',
    border = {}
  }) {
    this.width = width
    this.height = height
    this.top = top
    this.left = left
    this.zIndex = zIndex
    this.backgroundColor = backgroundColor
    this.border = new Border(border)
    this.padding = padding
  }
}
