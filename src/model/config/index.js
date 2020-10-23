/**
* 配置
* Author: dong xing
* Date: 2020/3/26
* Time: 13:58
* Email: dong.xing@outlook.com
*/

import Factory from '../factory/factory'
import CommonConfig from './commonConfig'
import DataConfig from './dataConfig'

// 图表专有属性工厂
const chartProprietaryConfigFactory = Factory.createChartProprietaryConfigFactory()

// 元素专有属性工厂
const elementProprietaryConfigFactory = Factory.createElementProprietaryConfigFactory()

export default class Config {
  constructor ({
    category, type, commonConfig, proprietaryConfig,
    dataConfig, icon, name
  }) {
    this.category = category
    this.icon = icon
    this.type = type
    this.name = name
    this.commonConfig = new CommonConfig(commonConfig || {})
    this.proprietaryConfig = this.getProprietaryConfigFactory(category).create({
      type,
      proprietaryConfig
    })
    this.isExpaned = false
    this.dataConfig = new DataConfig({
      widgetType: type,
      ...dataConfig
    })
  }

  /**
   * 根据分类获取其特配置工厂函数
   * @param category
   * @returns {*}
   */
  getProprietaryConfigFactory (category) {
    return category === 'ELEMENT' ? elementProprietaryConfigFactory : chartProprietaryConfigFactory
  }
}
