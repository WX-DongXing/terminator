/**
* 公共配置
* Author: dong xing
* Date: 2020/3/5
* Time: 16:53
* Email: dong.xing@outlook.com
*/

import _ from 'lodash'
import { Border } from '../../common'

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
    colorMode = 'single',
    backgroundColor = 'rgba(255,255,255,1)',
    border = {}
  }) {
    this.width = width
    this.height = height
    this.top = top
    this.left = left
    this.zIndex = zIndex
    this.colorMode = colorMode
    this.backgroundColor = backgroundColor
    this.border = new Border(border)
    this.padding = padding
  }

  /**
   * 获取配置的padding
   * @returns {{top: number, left: number, bottom: number, right: number}}
   */
  getPadding () {
    const [top, right, bottom, left] = this.padding
    return { top, right, bottom, left }
  }

  /**
   * 获取布局配置
   */
  getOption () {
    return _.cloneDeep({
      grid: [
        {
          show: true,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: 'transparent',
          borderWidth: 0
        },
        {
          show: true,
          top: 30 + this.padding[0],
          right: 30 + this.padding[1],
          bottom: 30 + this.padding[2],
          left: 30 + this.padding[3],
          borderWidth: 0,
          backgroundColor: 'transparent'
        }
      ]
    })
  }
}
