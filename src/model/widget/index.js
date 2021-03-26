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

export default class Widget {
  constructor ({
    widgetId = 'widget-' + uuid(),
    config = {},
    render = null,
    transition
  }) {
    this.widgetId = widgetId
    this.config = new Config(config)
    this.render = render
    this.transition = transition
  }

  /**
   * 获取部件配置
   * @param param
   * @returns {*}
   */
  getOption ({ mode }) {
    const { widgetId, config, transition } = this
    return {
      transition,
      widgetId: (mode && mode === 'preview') ? widgetId + '-preview' : widgetId,
      config: _.cloneDeep(config)
    }
  }
}
