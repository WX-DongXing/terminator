import LineChart from '../charts/LineChart';

export default class ChartFactory {
  static create(type, element, widget) {
    switch (type) {
      case 'Lines':
        return new LineChart(element, widget);
      default:
        return null;
    }
  }
}
