/**
* 图标专有配置
* Author: dong xing
* Date: 2020/3/26
* Time: 13:50
* Email: dong.xing@outlook.com
*/

import _ from 'lodash'
import { IconOption } from './index'

export default class IconProprietaryConfig {
  constructor ({
    fontSize = 96,
    color = 'rgba(64, 169, 255, 1)',
    option = {}
  }) {
    this.fontSize = fontSize
    this.color = color
    this.option = new IconOption(option)
  }

  /**
   * 映射配置
   */
  getOption () {
    return { ..._.omit(this, ['option']) }
  }
}
