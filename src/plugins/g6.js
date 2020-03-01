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
import { ScreenMutations } from '@/store/modules/screen'
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
      // 连线完毕更新激活边
      store.commit('screen/' + ScreenMutations.ACTIVATE_EDGE, {
        activeEdge: this.edge
      })
      controlPoints = []
      this.edge = null
      this.addingEdge = false
      // 联系完毕后更新配置
      const { render, config } = store.state.screen.activeWidget
      render.save(config)
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
        // 未完成连线清除
        store.commit('screen/' + ScreenMutations.ACTIVATE_EDGE, {
          activeEdge: null
        })
        this.graph.removeItem(this.edge)
        this.edge = null
        this.addingEdge = false
      }
    }
  }
})

// 覆写圆形节点
G6.registerNode('circle', {
  afterDraw (cfg, group) {
    const item = group.get('item')
    const model = item.getModel()
    // 边框
    const border = group.addShape('circle', {
      attrs: {
        x: 0,
        y: 0,
        r: (model.size[0] + 16) / 2,
        fill: 'transparent',
        lineWidth: 5,
        stroke: 'rgba(24,144,255,1)'
      }
    })
    border.animate({
      onFrame (ratio) {
        const cfg = {
          r: (model.size[0] + 16) / 2
        }
        const [state] = item.getStates()
        if (state) {
          switch (state) {
            case 'default':
              cfg.stroke = `rgba(24,144,255,${ratio})`
              break
            case 'warning':
              cfg.stroke = `rgba(255,173,18,${ratio})`
              break
            case 'danger':
              cfg.stroke = `rgba(255,77,79,${ratio})`
              break
            case 'success':
              cfg.stroke = `rgba(81,196,26,${ratio})`
              break
            default:
              cfg.stroke = `rgba(24,144,255,0)`
              break
          }
        } else {
          cfg.stroke = `rgba(24,144,255,0)`
        }
        return cfg
      },
      repeat: true
    }, 1500, 'easeCubic')
  }
}, 'circle')

// 覆写椭圆形节点
G6.registerNode('ellipse', {
  afterDraw (cfg, group) {
    const item = group.get('item')
    const model = item.getModel()
    // 边框
    const border = group.addShape('ellipse', {
      attrs: {
        x: 0,
        y: 0,
        rx: (model.size[0] + 16) / 2,
        ry: (model.size[1] + 16) / 2,
        fill: 'transparent',
        lineWidth: 5,
        stroke: 'rgba(24,144,255,1)'
      }
    })
    border.animate({
      onFrame (ratio) {
        const cfg = {
          rx: (model.size[0] + 16) / 2,
          ry: (model.size[1] + 16) / 2
        }
        const [state] = item.getStates()
        if (state) {
          switch (state) {
            case 'default':
              cfg.stroke = `rgba(24,144,255,${ratio})`
              break
            case 'warning':
              cfg.stroke = `rgba(255,173,18,${ratio})`
              break
            case 'danger':
              cfg.stroke = `rgba(255,77,79,${ratio})`
              break
            case 'success':
              cfg.stroke = `rgba(81,196,26,${ratio})`
              break
            default:
              cfg.stroke = `rgba(24,144,255,0)`
              break
          }
        } else {
          cfg.stroke = `rgba(24,144,255,0)`
        }
        return cfg
      },
      repeat: true
    }, 1500, 'easeCubic')
  }
}, 'ellipse')

// 覆写椭圆形节点
G6.registerNode('rect', {
  afterDraw (cfg, group) {
    const item = group.get('item')
    const model = item.getModel()
    // 边框
    const border = group.addShape('rect', {
      attrs: {
        x: -(model.size[0] + 16) / 2,
        y: -(model.size[1] + 16) / 2,
        width: model.size[0] + 16,
        height: model.size[1] + 16,
        fill: 'transparent',
        lineWidth: 5,
        stroke: 'rgba(24,144,255,1)'
      }
    })
    border.animate({
      onFrame (ratio) {
        const cfg = {
          x: -(model.size[0] + 16) / 2,
          y: -(model.size[1] + 16) / 2,
          width: model.size[0] + 16,
          height: model.size[1] + 16
        }
        const [state] = item.getStates()
        if (state) {
          switch (state) {
            case 'default':
              cfg.stroke = `rgba(24,144,255,${ratio})`
              break
            case 'warning':
              cfg.stroke = `rgba(255,173,18,${ratio})`
              break
            case 'danger':
              cfg.stroke = `rgba(255,77,79,${ratio})`
              break
            case 'success':
              cfg.stroke = `rgba(81,196,26,${ratio})`
              break
            default:
              cfg.stroke = `rgba(24,144,255,0)`
              break
          }
        } else {
          cfg.stroke = `rgba(24,144,255,0)`
        }
        return cfg
      },
      repeat: true
    }, 1500, 'easeCubic')
  }
}, 'rect')

// 覆写椭圆形节点
G6.registerNode('image', {
  afterDraw (cfg, group) {
    const item = group.get('item')
    const model = item.getModel()
    // 边框
    const border = group.addShape('rect', {
      attrs: {
        x: -(model.size[0] + 16) / 2,
        y: -(model.size[1] + 16) / 2,
        width: model.size[0] + 16,
        height: model.size[1] + 16,
        fill: 'transparent',
        lineWidth: 5,
        stroke: 'rgba(24,144,255,1)'
      }
    })
    border.animate({
      onFrame (ratio) {
        const cfg = {
          x: -(model.size[0] + 16) / 2,
          y: -(model.size[1] + 16) / 2,
          width: model.size[0] + 16,
          height: model.size[1] + 16
        }
        const [state] = item.getStates()
        if (state) {
          switch (state) {
            case 'default':
              cfg.stroke = `rgba(24,144,255,${ratio})`
              break
            case 'warning':
              cfg.stroke = `rgba(255,173,18,${ratio})`
              break
            case 'danger':
              cfg.stroke = `rgba(255,77,79,${ratio})`
              break
            case 'success':
              cfg.stroke = `rgba(81,196,26,${ratio})`
              break
            default:
              cfg.stroke = `rgba(24,144,255,0)`
              break
          }
        } else {
          cfg.stroke = `rgba(24,144,255,0)`
        }
        return cfg
      },
      repeat: true
    }, 1500, 'easeCubic')
  }
}, 'image')

// lineDash 的差值，可以在后面提供 util 方法自动计算
const dashArray = [
  [0, 1],
  [0, 2],
  [1, 2],
  [0, 1, 1, 2],
  [0, 2, 1, 2],
  [1, 2, 1, 2],
  [2, 2, 1, 2],
  [3, 2, 1, 2],
  [4, 2, 1, 2]
]

const interval = 9 // lineDash 的总长度。

// 覆写直线
G6.registerEdge('line', {
  // 复写setState方法
  setState (name, value, item) {
    const shape = item.get('keyShape')
    // 监听 running 状态
    if (name === 'active') {
      // running 状态为 true 时
      if (value) {
        const length = shape.getTotalLength()
        let totalArray = []
        for (var i = 0; i < length; i += interval) {
          totalArray = totalArray.concat(
            store.state.screen.activeEdge ? (store.state.screen.activeEdge.getModel().style.lineDash[0] < 4 ? [4] : store.state.screen.activeEdge.getModel().style.lineDash) : [4]
          )
        }
        let index = 0
        shape.animate({
          // 动画重复
          repeat: true,
          // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
          onFrame (ratio) {
            const cfg = {
              lineDash: dashArray[index].concat(totalArray)
            }
            index = (index + 1) % interval
            return cfg
          }
        }, 3000) // 一次动画的时长为 3000
      } else {
        // 结束动画
        shape.stopAnimate()
        // 重置 lineDash
        shape.attr('lineDash', store.state.screen.activeEdge.getModel().style.lineDash)
      }
    }
  }
}, 'line')

// 覆写弧线
G6.registerEdge('cubic', {
  // 复写setState方法
  setState (name, value, item) {
    const shape = item.get('keyShape')
    // 监听 running 状态
    if (name === 'active') {
      // running 状态为 true 时
      if (value) {
        const length = shape.getTotalLength()
        let totalArray = []
        for (var i = 0; i < length; i += interval) {
          totalArray = totalArray.concat(
            store.state.screen.activeEdge ? (store.state.screen.activeEdge.getModel().style.lineDash[0] < 4 ? [4] : store.state.screen.activeEdge.getModel().style.lineDash) : [4]
          )
        }
        let index = 0
        shape.animate({
          // 动画重复
          repeat: true,
          // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
          onFrame (ratio) {
            const cfg = {
              lineDash: dashArray[index].concat(totalArray)
            }
            index = (index + 1) % interval
            return cfg
          }
        }, 3000) // 一次动画的时长为 3000
      } else {
        // 结束动画
        shape.stopAnimate()
        // 重置 lineDash
        shape.attr('lineDash', store.state.screen.activeEdge.getModel().style.lineDash)
      }
    }
  }
}, 'cubic')

// 覆写折线
G6.registerEdge('polyline', {
  // 复写setState方法
  setState (name, value, item) {
    const shape = item.get('keyShape')
    // 监听 running 状态
    if (name === 'active') {
      // running 状态为 true 时
      if (value) {
        const length = shape.getTotalLength()
        let totalArray = []
        for (var i = 0; i < length; i += interval) {
          totalArray = totalArray.concat(
            store.state.screen.activeEdge ? (store.state.screen.activeEdge.getModel().style.lineDash[0] < 4 ? [4] : store.state.screen.activeEdge.getModel().style.lineDash) : [4]
          )
        }
        let index = 0
        shape.animate({
          // 动画重复
          repeat: true,
          // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
          onFrame (ratio) {
            const cfg = {
              lineDash: dashArray[index].concat(totalArray)
            }
            index = (index + 1) % interval
            return cfg
          }
        }, 3000) // 一次动画的时长为 3000
      } else {
        // 结束动画
        shape.stopAnimate()
        // 重置 lineDash
        shape.attr('lineDash', store.state.screen.activeEdge.getModel().style.lineDash)
      }
    }
  }
}, 'polyline')
