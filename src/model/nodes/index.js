/**
* 拓扑节点
* Author: dong xing
* Date: 2020/2/11
* Time: 11:06 上午
* Email: dong.xing@outlook.com
*/
import uuid from 'uuid/v4'

// 默认样式
const defaultStyle = {
  fill: '#1890ff',
  lineWidth: 5
}

// 默认标签配置
const defaultLabelCfg = {
  position: 'bottom',
  offset: 10
}

// 默认连接点
const defaultAnchorPoints = []

// 拓扑节点
export default class Node {
  constructor ({
    x, y, shape, label,
    size = [],
    anchorPoints = defaultAnchorPoints,
    style = defaultStyle,
    labelCfg = defaultLabelCfg
  }) {
    this.id = 'node-' + uuid()
    this.x = x
    this.y = y
    this.shape = shape
    this.size = size
    this.anchorPoints = anchorPoints
    this.style = style
    this.label = label
    this.labelCfg = labelCfg
  }
}
