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
      animate: true,
      modes: {
        default: [
          'zoom-canvas',
          'drag-canvas',
          'drag-node',
          'select-node',
          {
            type: 'brush-select',
            trigger: 'ctrl',
            includeEdges: true
          }
        ],
        addEdge: [
          'zoom-canvas',
          'drag-canvas',
          'drag-node',
          'add-edge',
          {
            type: 'brush-select',
            trigger: 'ctrl',
            includeEdges: true
          }
        ]
      },
      // 节点不同状态下的样式集合
      nodeStateStyles: {
        // 鼠标点击节点，即 click 状态为 true 时的样式
        active: {
          lineWidth: 10
        },
        inactive: {
          fill: '#eeeeee',
          stroke: '#eeeeee'
        }
      },
      // 边不同状态下的样式集合
      edgeStateStyles: {
        // 鼠标点击边，即 click 状态为 true 时的样式
        click: {
          stroke: 'steelblue'
        }
      }
    })
    this.initConfig = {
      nodes: [],
      edges: []
    }
    this.chart.data(this.initConfig)
    this.chart.render()

    // 对于缩放事件的监听
    this.chart.on('wheelzoom', e => {
    })

    // 点击节点
    this.chart.on('node:click', e => {
    })

    // 点击画布
    this.chart.on('canvas:click', e => {
    })
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
