/**
* 图表工厂
* Author: dong xing
* Date: 2019/11/19
* Time: 5:36 下午
* Email: dong.xing@outlook.com
*/
import LineChart from '../charts/LineChart'
import BarChart from '../charts/BarChart'

export default class ChartFactory {
  static create (type, widget) {
    switch (type) {
      case 'Lines':
        return new LineChart(widget)
      case 'Bar':
        return new BarChart(widget)
      default:
        return null
    }
  }
}
