import ChartFactory from './chartFactory'
import ElementFactory from './elementFactory'
import ChartProprietaryConfigFactory from './chartProprietaryConfigFactory'
import StaticDataFactory from './staticDataFactory'

export default class Factory {
  // 创建图表工厂
  static createChartFactory = () => ChartFactory

  // 创建图表专有配置工厂
  static createChartProprietaryConfigFactory = () => ChartProprietaryConfigFactory

  // 创建图表静态数据配置工厂
  static createStaticDataFactory = () => StaticDataFactory

  // 创建元素工厂
  static createElementFactory = () => ElementFactory
}
