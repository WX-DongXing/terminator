import ChartFactory from './chartFactory';
import ElementFactory from './elementFactory';

export default class Factory {
  // 图表工厂
  static createChartFactory = () => ChartFactory

  // 元素工厂
  static createElementFactory = () => ElementFactory
}
