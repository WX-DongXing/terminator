import Factory from '../factory/factory'
import CommonConfig from './commonConfig'
import DataConfig from './dataConfig'

// 图表专有属性工厂
const chartProprietaryConfigFactory = Factory.createChartProprietaryConfigFactory()

class Config {
  constructor ({
    category, type, commonConfig, proprietaryConfig, dataConfig
  }) {
    this.category = category
    this.type = type
    this.commonConfig = new CommonConfig(commonConfig || {})
    this.proprietaryConfig = chartProprietaryConfigFactory.create({
      type,
      proprietaryConfig
    })
    this.dataConfig = new DataConfig({
      widgetType: type,
      ...dataConfig
    })
  }
}

export default Config
