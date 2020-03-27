/**
* 图标
* Author: dong xing
* Date: 2020/3/26
* Time: 18:02
* Email: dong.xing@outlook.com
*/
import anime from 'animejs'
import Element from './index'

export default class IconElement extends Element {
  mergeOption ({ proprietaryConfig }) {
    anime.set(this.element, {
      ...proprietaryConfig.getOption()
    })
  }
}
