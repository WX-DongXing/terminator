/**
* 图表工厂
* Author: dong xing
* Date: 2019/11/19
* Time: 5:36 下午
* Email: dong.xing@outlook.com
*/
import LineChart from '../charts/LineChart'
import BarChart from '../charts/BarChart'
import TopologyChart from '../charts/TopologyChart'

export default class ChartFactory {
  static create (type, widget) {
    switch (type) {
      case 'Lines':
        return new LineChart(widget)
      case 'Bar':
        return new BarChart(widget)
      case 'Topology':
        return new TopologyChart(widget)
      default:
        return null
    }
  }
}
