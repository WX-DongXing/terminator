/**
* 部件对象
* Author: dong xing
* Date: 2019/11/13
* Time: 2:01 下午
* Email: dong.xing@outlook.com
*/
import uuid from 'uuid/v4'
import Config from '../config'

export default class Widget {
  constructor ({
    config, render = null
  }) {
    this.widgetId = 'widget-' + uuid()
    this.config = new Config(config)
    this.render = render
  }
}
