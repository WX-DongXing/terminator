/**
* G6 css缩放场景坐标异常补丁
* Author: dong xing
* Date: 2020/2/10
* Time: 12:59 下午
* Email: dong.xing@outlook.com
*/

import G6 from '@antv/g6'
import _ from 'lodash'
import store from '@/store'
import Edge from '../model/edges'

//  节点连线控制点
// eslint-disable-next-line
let controlPoints = []

/**
 * 替换 G.Canvas.getPointByClient 函数，适配CSS缩放的场景。
 * */
const rawGetPointByClient = G6.G.Canvas.prototype.getPointByClient
// 由于需要运行时this指针，这个函数不可改为箭头函数。
G6.G.Canvas.prototype.getPointByClient = function (clientX, clientY) {
  // 获取原函数返回的坐标值
  const raw = rawGetPointByClient.call(this, clientX, clientY)
  // 获取设定高宽和真实高宽。
  // 当设定的高宽不等于getBoundingClientRect获取的高宽时，说明存在缩放。
  const el = this.get('el')
  const bbox = el.getBoundingClientRect()
  const setWidth = this.get('width')
  const setHeight = this.get('height')
  const { width: realWidth, height: realHeight } = bbox
  // 除以缩放比（真实高宽 / 设定高宽）获得真实的坐标。
  return {
    x: raw.x / (realWidth / setWidth),
    y: raw.y / (realHeight / setHeight)
  }
}

// 注册节点选中行为
G6.registerBehavior('select-node', {
  getEvents () {
    return {
      'node:click': 'onNodeClick',
      'canvas:click': 'onCanvasClick'
    }
  },
  onNodeClick (e) {
    const graph = this.graph
    const item = e.item
    const nodes = graph.findAll('node', () => true)
    nodes.forEach(node => graph.setItemState(node, 'active', false))
    graph.setItemState(item, 'active', true)
  },
  onCanvasClick (e) {
    // shouldUpdate 返回 true 时取消所有节点的 'active' 状态，即将 'active' 状态置为 false
    if (this.shouldUpdate(e)) {
      const graph = this.graph
      graph.findAllByState('node', 'active').forEach(node => {
        graph.setItemState(node, 'active', false)
      })
    }
  }
})

// 注册节点选中行为
G6.registerBehavior('add-edge', {
  getEvents () {
    return {
      'node:click': 'onNodeClick',
      mousemove: 'onMousemove',
      'edge:click': 'onEdgeClick'
    }
  },
  onNodeClick (e) {
    const node = e.item
    const graph = this.graph
    const point = {
      x: e.x,
      y: e.y
    }
    const model = node.getModel()
    if (this.addingEdge && this.edge) {
      graph.updateItem(this.edge, {
        target: model.id
      })
      controlPoints = []
      this.edge = null
      this.addingEdge = false
    } else {
      this.edge = graph.addItem('edge', new Edge({
        source: model.id,
        target: point,
        controlPoints,
        ..._.omit(_.cloneDeep(store.state.screen.edgeConfig), ['id', 'source', 'target', 'controlPoints'])
      }))
      this.addingEdge = true
    }
  },
  onMousemove (e) {
    const point = {
      x: e.x,
      y: e.y
    }
    if (this.addingEdge && this.edge) {
      this.graph.updateItem(this.edge, {
        target: point
      })
    }
  },
  onEdgeClick ({ item, canvasX, canvasY }) {
    // 拖拽过程中，点击会点击到新增的边上
    if (this.addingEdge && this.edge === item) {
      if (store.state.screen.edgeConfig.shape === 'polyline') {
        // 折线控制点
        controlPoints.push({ x: canvasX, y: canvasY })
      } else {
        this.graph.removeItem(this.edge)
        this.edge = null
        this.addingEdge = false
      }
    }
  }
})
