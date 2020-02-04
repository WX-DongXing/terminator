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
      height
    })
    this.initConfig = {
      nodes: [
        {
          id: 'node1',
          groupId: 'group1',
          label: 'node1'
        },
        {
          id: 'node2',
          groupId: 'group1',
          label: 'node2'
        }
      ],
      edges: [
        {
          source: 'node1',
          target: 'node2'
        }
      ],
      groups: [
        {
          id: 'group1',
          title: {
            text: '我的群组1',
            stroke: '#444',
            offsetX: -20,
            offsetY: 30
          }
        }
      ]
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
