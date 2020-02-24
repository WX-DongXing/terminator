/**
* 拓扑元素
* Author: dong xing
* Date: 2020/1/13
* Time: 2:53 下午
* Email: dong.xing@outlook.com
*/

import G6 from '@antv/g6'
import _ from 'lodash'
import Chart from './index'
import store from '@/store'
import { ScreenMutations } from '@/store/modules/screen'

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
      plugins: [],
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
      layout: {
        // type: 'dagre'
      },
      animate: true,
      // 节点不同状态下的样式集合
      nodeStateStyles: {
        // 鼠标点击节点，即 click 状态为 true 时的样式
        active: {
          // lineWidth: 1
          // fill: '#eeeeee',
          // stroke: '#eeeeee'
        },
        inactive: {
          // fill: '#eeeeee',
          // stroke: '#eeeeee'
        }
      },
      // 边不同状态下的样式集合
      edgeStateStyles: {
        // 鼠标点击边，即 click 状态为 true 时的样式
        click: {
          stroke: 'steelblue'
        },
        enter: {
          stroke: '#1890ff'
        }
      }
    })
    this.chart.read({
      nodes: [],
      edges: []
    })

    // 对于缩放事件的监听
    this.chart.on('wheelzoom', e => {
    })

    // 节点点击事件
    this.chart.on('node:click', ({ item }) => {
      store.commit('screen/' + ScreenMutations.ACTIVATION_NODE, {
        activeNode: item
      })
    })

    // 节点拖动事件
    this.chart.on('node:drag', ({ item }) => {
      const activeNode = store.state.screen.activeNode
      if (activeNode) {
        store.commit('screen/' + ScreenMutations.ACTIVATION_NODE, {
          activeNode: item
        })
      }
    })

    // 鼠标移入边事件
    this.chart.on('edge:mouseenter', ({ item }) => {
      this.chart.setItemState(item, 'enter', true)
    })

    // 边点击事件
    this.chart.on('edge:click', ({ item }) => {
      store.commit('screen/' + ScreenMutations.ACTIVATION_EDGE, {
        activeEdge: item
      })
    })

    // 鼠标移出边事件
    this.chart.on('edge:mouseout', ({ item }) => {
      this.chart.setItemState(item, 'enter', false)
    })

    // 画布点击事件
    this.chart.on('canvas:click', e => {
      // 清空激活的节点
      store.commit('screen/' + ScreenMutations.ACTIVATION_NODE, {
        activeNode: null
      })
      // 清空激活的边
      store.commit('screen/' + ScreenMutations.ACTIVATION_EDGE, {
        activeEdge: null
      })
    })
  }

  /**
   * 保存配置
   * @param widget
   */
  save ({ proprietaryConfig }) {
    Object.assign(proprietaryConfig, _.cloneDeep(this.chart.save()))
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
