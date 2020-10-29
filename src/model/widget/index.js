/**
* 部件对象
* Author: dong xing
* Date: 2019/11/13
* Time: 2:01 下午
* Email: dong.xing@outlook.com
*/
import _ from 'lodash'
import uuid from 'uuid/v4'
import Config from '../config'
import AnimateProps from '@/model/animateProps'

export default class Widget {
  constructor ({
    widgetId = 'widget-' + uuid(),
    config = {},
    animateProps = {},
    render = null
  }) {
    this.widgetId = widgetId
    this.config = new Config(config)
    this.animateProps = new AnimateProps({ ...config.commonConfig, ...animateProps })
    this.render = render
  }

  /**
   * 获取部件配置
   * @returns {*}
   */
  getOption () {
    const { widgetId, config } = this
    return {
      widgetId,
      config: _.cloneDeep(config)
    }
  }
}
