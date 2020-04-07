/**
* 图标专有配置
* Author: dong xing
* Date: 2020/3/26
* Time: 13:50
* Email: dong.xing@outlook.com
*/

import _ from 'lodash'
import { IconProps } from './index'

export default class IconProprietaryConfig {
  constructor ({
    fontSize = 48,
    color = 'rgba(64, 169, 255, 1)',
    // 对应组件props属性
    props = {}
  }) {
    this.fontSize = fontSize
    this.color = color
    this.props = new IconProps(props)
  }

  /**
   * 映射配置
   */
  getOption () {
    return { ..._.omit(this, ['props']) }
  }
}
