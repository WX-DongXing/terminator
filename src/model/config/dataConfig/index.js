/**
* 数据配置
* Author: dong xing
* Date: 2019/11/20
* Time: 5:12 下午
* Email: dong.xing@outlook.com
*/
import Factory from '@/model/factory/factory';

const StaticDataConfigFactory = Factory.createStaticDataConfigFactory();

export default class DataConfig {
  constructor({
    sourceType = 'static',
    widgetType,
    dbDataConfig,
  }) {
    this.sourceType = sourceType;
    this.staticDataConfig = StaticDataConfigFactory.create(widgetType);
    this.dbDataConfig = dbDataConfig;
  }
}
