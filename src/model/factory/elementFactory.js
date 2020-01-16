/**
* 元素工厂
* Author: dong xing
* Date: 2019/11/19
* Time: 5:36 下午
* Email: dong.xing@outlook.com
*/

// import TextElement from '../element/TextElement';

export default class ElementFactory {
  static create (type, widget) {
    switch (type) {
      case 'text':
        // return new TextElement()
        return null
      default:
        return null
    }
  }
}
