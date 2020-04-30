/**
* 饼图
* Date: 2020/4/26
* Time: 3:02 下午
*/

import _ from 'lodash'
import { Legend, PieItemStyle } from './index'

export default class PieProprietaryConfig {
  constructor ({
    roseType = 'none',
    radius = {
      outside: 0,
      inside: '75%'
    },
    legend = {},
    pieItemStyle = {}
  }) {
    this.roseType = roseType
    this.radius = radius
    this.legend = new Legend(legend)
    this.pieItemStyle = new PieItemStyle(pieItemStyle)
  }

  /**
   * 获取柱形图专有配置
   */
  getOption () {
    return Object.assign(_.cloneDeep(this), {
      roseType: this.roseType === 'none' ? undefined : this.roseType,
      radius: [this.radius.outside, this.radius.inside],
      itemStyle: this.pieItemStyle.getOption()
    })
  }
}
