/**
* 部件对象
* Author: dong xing
* Date: 2019/11/13
* Time: 2:01 下午
* Email: dong.xing@outlook.com
*/
import uuid from 'uuid/v4';
import Template from '../template';

export default class Widget extends Template {
  constructor({
    category, name, type, icon, height, width,
  }) {
    super({
      category, name, type, icon, height, width,
    });
    this.widgetId = uuid();
  }
}
