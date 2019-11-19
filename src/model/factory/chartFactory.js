/**
* 图表工厂
* Author: dong xing
* Date: 2019/11/19
* Time: 5:36 下午
* Email: dong.xing@outlook.com
*/
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
