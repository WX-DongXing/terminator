/**
* 元素专有属性工厂
* Author: dong xing
* Date: 2020/3/26
* Time: 13:48
* Email: dong.xing@outlook.com
*/
import IconProprietaryConfig from '../config/proprietaryConfigs/IconProprietaryConfig'

export default class ElementProprietaryConfigFactory {
  static create ({ type, proprietaryConfig = {} }) {
    switch (type) {
      case 'Icon':
        return new IconProprietaryConfig(proprietaryConfig)
      default:
        return null
    }
  }
}
