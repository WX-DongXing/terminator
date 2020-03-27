/**
* 元素工厂
* Author: dong xing
* Date: 2019/11/19
* Time: 5:36 下午
* Email: dong.xing@outlook.com
*/
import IconElement from '../elements/IconElement'

export default class ElementFactory {
  static create (type, widget) {
    switch (type) {
      case 'Icon':
        return new IconElement(widget)
      default:
        return null
    }
  }
}
