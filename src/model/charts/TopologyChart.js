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

export default class TopologyChart extends Chart {
  constructor ({ widget }) {
    super({ widget })
    this.menuItem = null
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
        default: [
          // 'zoom-canvas',
          // 'drag-canvas',
          // 'drag-node',
          // 'select-node',
          // {
          //   type: 'brush-select',
          //   trigger: 'ctrl',
          //   includeEdges: true
          // },
          // {
          //   type: 'tooltip', // 节点提示框
          //   formatText (model) {
          //     // 提示框文本内容
          //     return 'label: ' + model.label + '<br/>'
          //   }
          // },
          // {
          //   type: 'edge-tooltip', // 边提示框
          //   formatText (model) { // 边提示框文本内容
          //     return 'label: ' + model.label +
          //       '<br/> source: ' + model.source +
          //       '<br/> target: ' + model.target
          //   }
          // }
        ],
        edit: [
          'zoom-canvas',
          'drag-canvas',
          'drag-node',
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
    this.initContentMenu()
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
      this.menuItem = e.item
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
      this.menuItem = e.item
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
    const p = document.createElement('p')
    p.innerText = '删除'
    p.onclick = () => {
      const type = this.menuItem.get('type')
      if (type === 'node') {
        // 如果当前激活节点和删除节点一致，则置空激活节点
        if (store.state.screen.activeNode.get('id') === this.menuItem.get('id')) {
          // 清空激活的节点
          store.commit('screen/' + ScreenMutations.ACTIVATE_NODE, {
            activeNode: null
          })
        }
      } else if (type === 'edge') {
        // 如果当前激活边和删除边一致，则置空激活边
        if (store.state.screen.activeEdge.get('id') === this.menuItem.get('id')) {
          // 清空激活的节点
          store.commit('screen/' + ScreenMutations.ACTIVATE_EDGE, {
            activeEdge: null
          })
        }
      }
      // 隐藏右键菜单
      this.hideContentMenu()
      // 从拓扑图中删除该节点
      this.chart.removeItem(this.menuItem)
      // 更新拓扑图配置
      store.commit('screen/' + ScreenMutations.UPDATE_TOPOLOGY_CONFIG)
    }
    anime.set(p, {
      width: '100px',
      height: '40px',
      lineHeight: '40px',
      textAlign: 'center',
      color: '#ff4d4f',
      cursor: 'pointer',
      fontSize: '14px',
      margin: 0
    })
    menuDom.appendChild(p)
    anime.set(menuDom, {
      position: 'absolute',
      width: 100,
      height: 40,
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
