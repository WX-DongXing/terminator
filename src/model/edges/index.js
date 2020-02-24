/**
* 拓扑边
* Author: dong xing
* Date: 2020/2/20
* Time: 2:29 下午
* Email: dong.xing@outlook.com
*/

import uuid from 'uuid/v4'

// 默认样式
const defaultStyle = {
  stroke: 'rgba(0,0,0,1)',
  lineWidth: 1,
  radius: 2,
  lineAppendWidth: 3,
  lineDash: [0]
}

// 默认文本样式
const defaultLabelStyle = {
  fill: 'rgba(0,0,0,1)',
  fontSize: 12
}

// 默认文本配置
const defaultLabelCfg = {
  position: 'middle',
  style: defaultLabelStyle
}

export default class Edge {
  constructor ({
    source = '',
    target = '',
    shape = 'line',
    controlPoints = [],
    style = defaultStyle,
    label = '',
    labelCfg = defaultLabelCfg,
    // 启用动画
    animate = false,
    display = true
  }) {
    this.id = 'edge-' + uuid()
    this.source = source
    this.target = target
    this.shape = shape
    this.controlPoints = controlPoints
    this.style = style
    this.label = label
    this.labelCfg = labelCfg
    this.animate = animate
    this.display = display
  }
}
