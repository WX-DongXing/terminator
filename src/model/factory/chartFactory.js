import LineChart from '../charts/LineChart';

export default class ChartFactory {
  create(type) {
    switch (type) {
      case 'line':
        return new LineChart();
      default:
        return null;
    }
  }
}
