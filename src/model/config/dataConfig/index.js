/**
* 数据配置
* Author: dong xing
* Date: 2019/11/20
* Time: 5:12 下午
* Email: dong.xing@outlook.com
*/
import Factory from '@/model/factory/factory'

const StaticDataFactory = Factory.createStaticDataFactory()

export default class DataConfig {
  constructor ({
    sourceType = 'null',
    widgetType,
    dbDataConfig
  }) {
    this.sourceType = sourceType
    this.staticData = StaticDataFactory.create(widgetType)
    this.dbDataConfig = dbDataConfig
  }
}
