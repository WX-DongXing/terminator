import ChartFactory from './chartFactory';
import ElementFactory from './elementFactory';

export default class Factory {
  createChart = () => new ChartFactory()

  createElement = () => new ElementFactory()
}
