/**
* 部件对象
* Author: dong xing
* Date: 2019/11/13
* Time: 2:01 下午
* Email: dong.xing@outlook.com
*/
import uuid from 'uuid/v4';
import Config from '../config';

export default class Widget {
  constructor({
    category, type, config, render = null,
  }) {
    this.widgetId = uuid();
    this.category = category;
    this.type = type;
    this.config = new Config(config);
    this.render = render;
  }
}
