/**
* 拓扑元素
* Author: dong xing
* Date: 2020/1/13
* Time: 2:53 下午
* Email: dong.xing@outlook.com
*/

import _ from 'lodash'
import G6 from '@antv/g6'
import anime from 'animejs'
import ContentMenu from '@antv/g6/build/menu'
import Chart from './index'
import store from '@/store'
import { ScreenMutations } from '@/store/modules/screen'
import Factory from '@/model/factory/factory'

export default class TopologyChart extends Chart {
  constructor ({ widget }) {
    super({ widget })
    this.selectedItem = null
  }

  /**
   * 初始化图表
   * @param widget
   */
  init ({ config }) {
    const { commonConfig: { width, height }, proprietaryConfig } = config
    this.chart = new G6.Graph({
      container: this.container,
      width,
      height,
      renderer: 'canvas',
      plugins: [],
      modes: {
        default: [],
        edit: [
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
          'select-node',
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
          fill: '#dbdbdb',
          stroke: '#f2f2f2'
        },
        selected: {
          fill: 'rgba(241, 79, 13, .3)',
          lineWidth: 8,
          stroke: '#f14f0d'
        }
      },
      // 边不同状态下的样式集合
      edgeStateStyles: {
        // 鼠标点击边，即 click 状态为 true 时的样式
        click: {
          stroke: '#1890ff'
        },
        enter: {
          stroke: '#1890ff'
        },
        selected: {
          lineWidth: 4,
          stroke: '#f14f0d',
          fill: 'rgba(241, 79, 13, .3)'
        }
      }
    })

    // 初始化右键菜单
    this.initContentMenu()

    // 读取配置
    this.read(proprietaryConfig)

    // 对于缩放事件的监听
    this.chart.on('wheelzoom', () => {
      console.log(this.chart.getZoom())
    })

    // 对于节点右键触发上下文菜单
    this.chart.on('node:contextmenu', e => {
      const menuDom = this.contentMenu.get('menu')
      anime.set(menuDom, {
        display: 'block',
        top: e.y,
        left: e.x
      })
      this.selectedItem = e.item
    })

    // 对于节点离开事件
    this.chart.on('node:mouseleave', () => {
      // 隐藏右键菜单
      this.hideContentMenu()
    })

    // 对于边点右键触发上下文菜单
    this.chart.on('edge:contextmenu', e => {
      const menuDom = this.contentMenu.get('menu')
      anime.set(menuDom, {
        display: 'block',
        top: e.y,
        left: e.x
      })
      this.selectedItem = e.item
    })

    // 对于边离开事件
    this.chart.on('edge:mouseleave', () => {
      // 隐藏右键菜单
      this.hideContentMenu()
    })

    // 节点鼠标按下事件，设置当前节点为激活节点
    this.chart.on('node:mousedown', ({ item }) => {
      store.commit('screen/' + ScreenMutations.ACTIVATE_NODE, {
        activeNode: _.cloneDeep(item)
      })
    })

    // 节点拖动结束事件，更新当前激活节点配置，更新配置
    this.chart.on('node:dragend', ({ item }) => {
      const activeNode = store.state.screen.activeNode
      if (activeNode) {
        store.commit('screen/' + ScreenMutations.ACTIVATE_NODE, {
          activeNode: _.cloneDeep(item)
        })
        store.commit('screen/' + ScreenMutations.UPDATE_TOPOLOGY_CONFIG)
      }
    })

    // 鼠标移入边事件
    this.chart.on('edge:mouseenter', ({ item }) => {
      this.chart.setItemState(item, 'enter', true)
    })

    // 边点击事件
    this.chart.on('edge:click', ({ item }) => {
      store.commit('screen/' + ScreenMutations.ACTIVATE_EDGE, {
        activeEdge: _.cloneDeep(item)
      })
    })

    // 鼠标移出边事件
    this.chart.on('edge:mouseout', ({ item }) => {
      this.chart.setItemState(item, 'enter', false)
    })

    // 画布点击事件
    this.chart.on('canvas:click', () => {
      // 清空激活的节点
      store.commit('screen/' + ScreenMutations.ACTIVATE_NODE, {
        activeNode: null
      })
      // 清空激活的边
      store.commit('screen/' + ScreenMutations.ACTIVATE_EDGE, {
        activeEdge: null
      })
    })
  }

  /**
   * 添加右键菜单
   */
  initContentMenu () {
    this.contentMenu = new ContentMenu()
    this.chart.addPlugin(this.contentMenu)
    const menuDom = this.contentMenu.get('menu')
    // 删除dom节点
    const deleteDom = document.createElement('p')
    deleteDom.innerText = '删除'
    deleteDom.onclick = () => {
      const nodes = this.chart.findAllByState('node', 'selected')
      const edges = this.chart.findAllByState('edge', 'selected')
      const selectedItemStates = this.selectedItem.getStates()

      // 如果当前对象 selected 状态，则表明为组的删除，否则为当前对象的删除
      if (selectedItemStates.includes('selected')) {
        // 如果当前已选节点中包含激活边，将激活边置为null
        if (edges.some(edge => store.state.screen.activeEdge && edge.get('id') === store.state.screen.activeEdge.get('id'))) {
          // 清空激活的边
          store.commit('screen/' + ScreenMutations.ACTIVATE_EDGE, {
            activeEdge: null
          })
        }

        // 删除节点后其附带的边自动销毁，故此不必单独删除边
        nodes.forEach(item => {
          // 如果当前激活节点和删除节点一致，则置空激活节点
          if (store.state.screen.activeNode && store.state.screen.activeNode.get('id') === item.get('id')) {
            // 清空激活的节点
            store.commit('screen/' + ScreenMutations.ACTIVATE_NODE, {
              activeNode: null
            })
          }
          // 从拓扑图中删除该节点
          this.chart.removeItem(item)
        })
      } else {
        const type = this.selectedItem.get('type')
        if (type === 'node') {
          // 如果当前激活节点和删除节点一致，则置空激活节点
          if (store.state.screen.activeNode && store.state.screen.activeNode.get('id') === this.selectedItem.get('id')) {
            // 清空激活的节点
            store.commit('screen/' + ScreenMutations.ACTIVATE_NODE, {
              activeNode: null
            })
          }
        } else if (type === 'edge') {
          // 如果当前激活边和删除边一致，则置空激活边
          if (store.state.screen.activeEdge && store.state.screen.activeEdge.get('id') === this.selectedItem.get('id')) {
            // 清空激活的边
            store.commit('screen/' + ScreenMutations.ACTIVATE_EDGE, {
              activeEdge: null
            })
          }
        }
        // 从拓扑图中删除该节点
        this.chart.removeItem(this.selectedItem)
      }

      // 隐藏右键菜单
      this.hideContentMenu()

      // 更新拓扑图配置
      store.commit('screen/' + ScreenMutations.UPDATE_TOPOLOGY_CONFIG)
    }
    anime.set(deleteDom, {
      width: '100px',
      height: '40px',
      lineHeight: '40px',
      textAlign: 'center',
      color: '#ff4d4f',
      cursor: 'pointer',
      fontSize: '14px',
      margin: 0
    })

    // 复制dom节点
    const copyDom = document.createElement('p')
    copyDom.innerText = '复制'
    copyDom.onclick = () => {
      const nodes = this.chart.findAllByState('node', 'selected')
      const edges = this.chart.findAllByState('edge', 'selected')
      const selectedItemStates = this.selectedItem.getStates()
      const nodeFactory = Factory.createNodeFactory()

      // 如果当前对象 selected 状态，则表明为组的复制，否则为当前对象的复制
      if (selectedItemStates.includes('selected')) {
        // 遍历节点元素添加节点元素，由于存在边的关系，故此不能删除id，对id添加 '_copy' 印记
        nodes.forEach(node => {
          const copyNodeModel = _.cloneDeep(node.getModel())
          Object.assign(copyNodeModel, {
            x: copyNodeModel.x + 48,
            y: copyNodeModel.y + 48,
            id: copyNodeModel.id + '_copy'
          })
          const copyNode = nodeFactory.create(copyNodeModel)
          this.chart.addItem('node', copyNode)
          this.chart.setItemState(copyNode.id, copyNode.animateType, true)
        })
        edges.forEach(edge => {
          const copyEdgeModel = _.cloneDeep(edge.getModel())
          copyEdgeModel.controlPoints = copyEdgeModel.controlPoints.map(point => {
            point.x += 48
            point.y += 48
            return point
          })
          Object.assign(copyEdgeModel, {
            id: copyEdgeModel.id + '_copy',
            source: copyEdgeModel.source + '_copy',
            target: copyEdgeModel.target + '_copy'
          })
          this.chart.addItem('edge', copyEdgeModel)
          this.chart.setItemState(copyEdgeModel.id, 'active', copyEdgeModel.animate)
        })
      } else {
        // 复制单一节点元素，此元素域其他元素别无二致，故此删除原先的id，重新创建
        const copyNodeModel = _.cloneDeep(this.selectedItem.getModel())
        Object.assign(copyNodeModel, {
          x: copyNodeModel.x + 48,
          y: copyNodeModel.y + 48
        })
        Reflect.deleteProperty(copyNodeModel, 'id')
        const copyNode = nodeFactory.create(copyNodeModel)
        this.chart.addItem('node', copyNode)
        this.chart.setItemState(copyNode.id, copyNode.animateType, true)
      }
      // 隐藏右键菜单
      this.hideContentMenu()
      // 更新拓扑图配置
      store.commit('screen/' + ScreenMutations.UPDATE_TOPOLOGY_CONFIG)
    }
    anime.set(copyDom, {
      width: '100px',
      height: '40px',
      lineHeight: '40px',
      textAlign: 'center',
      color: '#1890ff',
      cursor: 'pointer',
      fontSize: '14px',
      margin: 0,
      borderTop: '1px solid rgba(0, 0, 0, .12)'
    })

    // 添加 删除及复制 dom节点
    menuDom.appendChild(deleteDom)
    menuDom.appendChild(copyDom)
    anime.set(menuDom, {
      position: 'absolute',
      width: 100,
      height: 80,
      borderRadius: 5,
      background: 'white',
      border: '1px solid #d9d9d9',
      boxShadow: '0 2px 0 rgba(0,0,0,.015)'
    })
  }

  /**
   * 隐藏右键菜单
   */
  hideContentMenu () {
    const menuDom = this.contentMenu.get('menu')
    anime.set(menuDom, {
      display: 'none'
    })
  }

  /**
   * 读取配置
   */
  read (proprietaryConfig) {
    this.chart.read(proprietaryConfig)
    const nodes = this.chart.getNodes()
    const edges = this.chart.getEdges()
    // 设置节点动画
    if (!_.isEmpty(nodes)) {
      nodes.forEach(node => {
        const model = node.getModel()
        this.chart.setItemState(node, model.animateType, true)
      })
    }
    // 设置边动画
    if (!_.isEmpty(edges)) {
      edges.forEach(edge => {
        const model = edge.getModel()
        this.chart.setItemState(edge, 'active', model.animate)
      })
    }
  }

  /**
   * 图表resize
   */
  resize () {
    if (this.container) {
      this.chart.changeSize(
        this.container.offsetWidth,
        this.container.offsetHeight
      )
    }
  }

  mergeOption (config) {
    this.config = config
    this.read(config.proprietaryConfig)
    this.chart.zoomTo(config.proprietaryConfig.zoom)
  }

  destroy () {
    this.chart.off()
    this.chart.destroy()
  }
}
