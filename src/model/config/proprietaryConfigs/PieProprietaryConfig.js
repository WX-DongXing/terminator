/**
* 饼图
* Date: 2020/4/26
* Time: 3:02 下午
*/

import _ from 'lodash'
import { Legend, PieItemStyle, PieLabel } from './index'

export default class PieProprietaryConfig {
  constructor ({
    hoverAnimation = true,
    hoverOffset = 10,
    startAngle = 90,
    roseType = 'none',
    radius = {
      outside: 0,
      inside: '75%'
    },
    pieLabel = {},
    legend = {},
    pieItemStyle = {}
  }) {
    this.hoverAnimation = hoverAnimation
    this.hoverOffset = hoverOffset
    this.startAngle = startAngle
    this.roseType = roseType
    this.radius = radius
    this.pieLabel = new PieLabel(pieLabel)
    this.stillShowZeroSum = false
    this.legend = new Legend(legend)
    this.pieItemStyle = new PieItemStyle(pieItemStyle)
  }

  /**
   * 获取柱形图专有配置
   */
  getOption () {
    return Object.assign(_.omit(_.cloneDeep(this), ['pieItemStyle', 'pieLabel']), {
      roseType: this.roseType === 'none' ? undefined : this.roseType,
      radius: [this.radius.outside, this.radius.inside],
      itemStyle: this.pieItemStyle.getOption(),
      label: this.pieLabel.getOption()
    })
  }
}
