/**
* 拓扑元素
* Author: dong xing
* Date: 2020/1/13
* Time: 2:53 下午
* Email: dong.xing@outlook.com
*/

import G6 from '@antv/g6'
import Chart from './index'

export default class TopologyChart extends Chart {
  constructor ({ widget }) {
    super({ widget })
  }

  /**
   * 初始化图表
   * @param widget
   */
  init ({ config }) {
    const { width, height } = config.commonConfig
    this.chart = new G6.Graph({
      container: this.container,
      width,
      height,
      renderer: 'canvas',
      modes: {
        default: ['zoom-canvas', 'drag-canvas', 'drag-node']
      },
      animate: true
    })
    this.initConfig = {
      nodes: [],
      edges: []
    }
    this.chart.data(this.initConfig)
    this.chart.render()
  }

  /**
   * 图表resize
   */
  resize (width, height) {
    if (width && height) {
      this.chart.changeSize(
        width,
        height
      )
    }
  }
}
