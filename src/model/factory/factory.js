import ChartFactory from './chartFactory';
import ElementFactory from './elementFactory';
import ChartProprietaryConfigFactory from './chartProprietaryConfigFactory';

export default class Factory {
  // 图表工厂
  static createChartFactory = () => ChartFactory

  // 图表专有配置工厂
  static createChartProprietaryConfigFactory = () => ChartProprietaryConfigFactory

  // 元素工厂
  static createElementFactory = () => ElementFactory
}
