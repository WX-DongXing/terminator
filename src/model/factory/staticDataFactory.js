/**
* 静态数据工厂
* Author: dong xing
* Date: 2019/11/20
* Time: 5:13 下午
* Email: dong.xing@outlook.com
*/
import LinesStaticData from '../config/dataConfig/staticData/LinesStaticData'
import BarStaticData from '../config/dataConfig/staticData/BarStaticData'

export default class StaticDataFactory {
  static create (type) {
    switch (type) {
      case 'Lines':
        return LinesStaticData
      case 'Bar':
        return BarStaticData
      default:
        return null
    }
  }
}
