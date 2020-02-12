/**
* 组件库模板
* Author: dong xing
* Date: 2019/11/13
* Time: 1:43 下午
* Email: dong.xing@outlook.com
*/
<template>
  <div class="template">
    <div class="template__header">
      <p>组件库</p>
    </div>

    <div class="template__list">
      <div
        v-stream:mousedown="{ subject: itemMouseDown$, data: item }"
        ref="item"
        v-for="(item, index) in templates"
        :class="[
          item.type === 'Topology' ? 'template__item topology' : 'template__item',
          (item.type === 'Topology' && topologyEditable) ? 'template__item--expand' : ''
        ]"
        :key="index">
        <div :class="['template__sign', (item.type === 'Topology' && topologyEditable) ? 'row-line' : '']">
          <a-icon :type="item.icon" />
          <p>{{ item.name }}</p>
        </div>
        <div class="template__topology" v-if="item.type === 'Topology' && topologyEditable">
          <div
            class="template__node"
            v-for="(node, i) in nodes"
            v-stream:mousedown="{ subject: nodeMouseDown$, data: node }"
            :key="i"
          >
            <a-icon :type="node.icon" />
            <p>{{ node.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs'
import _ from 'lodash'
import { fromEvent, merge, Subject } from 'rxjs'
import {
  map, takeWhile, takeUntil,
  tap, switchMap, first, filter, withLatestFrom
} from 'rxjs/operators'
import { mapState, mapGetters, mapMutations } from 'vuex'
import { ScreenMutations } from '@/store/modules/screen'
import TEMPLATES from './templates'
import NODES from './nodes'
import Widget from '@/model/widget'
import { Range } from '@/model/common'
import WrapperService from '@/components/wrapper/WrapperService'
import Factory from '@/model/factory/factory'

export default {
  name: 'Template',
  data: () => ({
    isSubscribed: true,
    cloneTemplate: null,
    cloneNode: null,
    xDistance: 0,
    yDistance: 0,
    viewUp$: null,
    templates: TEMPLATES,
    nodes: NODES,
    topologyArea: null,
    wrapperService: new WrapperService()
  }),
  subscriptions () {
    // 模板 mousedown 事件
    this.itemMouseDown$ = new Subject()
    // 拓扑节点 mousedown 事件
    this.nodeMouseDown$ = new Subject()
    // 全局 mousemove 事件
    this.documentMove$ = fromEvent(document, 'mousemove')
    // 全局 mouseup 事件
    this.documentUp$ = fromEvent(document, 'mouseup')
  },
  computed: {
    ...mapState(
      'screen',
      [
        'view',
        'widgets',
        'activeWidget',
        'topologyEditable'
      ]
    ),
    ...mapGetters('screen', ['scale'])
  },
  mounted () {
    this.viewUp$ = fromEvent(document.getElementsByClassName('view')[0], 'mouseup')

    // 模板移动至视图操作
    this.itemMouseDown$
      .pipe(
        takeWhile(() => this.isSubscribed),
        // 当启用拓扑图编辑时，取消其他模板移动至视图操作
        filter(() => !this.topologyEditable),
        tap(({ event }) => {
          this.cloneTemplate = event.target.cloneNode(true)
          const { x, y } = event.target.getBoundingClientRect()
          const { pageX, pageY } = event
          this.xDistance = Math.abs(pageX - x)
          this.yDistance = Math.abs(pageY - y)
          anime.set(this.cloneTemplate, {
            position: 'fixed',
            margin: 0,
            top: y,
            left: x,
            zIndex: 3
          })
          document.body.append(this.cloneTemplate)
          event.preventDefault()
        }),
        map(() => this.documentMove$.pipe(takeUntil(this.documentUp$))),
        switchMap(move$ => merge(this.documentUp$.pipe(first()), move$)),
        withLatestFrom(this.itemMouseDown$, (event, { data }) => ({ event, data })),
        tap(({ event, data }) => {
          const { pageX, pageY } = event
          const { width, height } = data
          // 设置克隆节点的位置
          anime.set(this.cloneTemplate, {
            transformOrigin: '0 0',
            top: pageY - this.yDistance,
            left: pageX - this.xDistance
          })
          // 设置克隆节点在视图区域的动画效果
          anime({
            targets: this.cloneTemplate,
            width: this.isWithinScope(event) ? width : 96,
            height: this.isWithinScope(event) ? height : 96,
            scale: this.isWithinScope(event) ? this.view.scale : 1,
            duration: 35,
            easing: 'linear'
          })
        }),
        filter(({ event }) => event.type === 'mouseup')
      )
      .subscribe(({ event, data }) => {
        if (this.isWithinScope(event)) {
          const { rect, scale, parent } = this.view
          const targetRect = event.target.getBoundingClientRect()
          const zIndexList = this.widgets.map(widget => widget.config.commonConfig.zIndex)
          // 部件层级
          const zIndex = _.isEmpty(zIndexList) ? 0 : Math.max(...zIndexList) + 1
          // 将模板对应为部件
          const widget = new Widget({
            config: {
              ...data,
              commonConfig: {
                ...data,
                top: (targetRect.y + parent.scrollTop - rect.y) / scale,
                left: (targetRect.x + parent.scrollLeft - rect.x) / scale,
                zIndex
              }
            }
          })
          // 将当期拖动的模板添加到视图的部件库中
          this.addWidget({ widget })
          // 将当前的部件状态激活
          this.activationWidget({ widget })
          // 选择器选中该部件
          this.wrapperService.next({ el: 'widget', widget })
        }
        // 从当前文档中移除该dom节点
        document.body.removeChild(this.cloneTemplate)
      })

    // 节点移动至拓扑视图操作
    this.nodeMouseDown$
      .pipe(
        takeWhile(() => this.isSubscribed),
        filter(() => this.topologyEditable),
        tap(({ event }) => {
          // 复制当前节点
          this.cloneNode = event.target.cloneNode(true)
          const { x, y } = event.target.getBoundingClientRect()
          const { pageX, pageY } = event
          this.xDistance = Math.abs(pageX - x)
          this.yDistance = Math.abs(pageY - y)
          anime.set(this.cloneNode, {
            position: 'fixed',
            top: y,
            left: x
          })
          document.body.append(this.cloneNode)
          event.preventDefault()
          // 计算激活拓扑部件的区域位置
          this.topologyArea = this.getTopologyArea()
        }),
        map(() => this.documentMove$.pipe(takeUntil(this.documentUp$))),
        switchMap(move$ => merge(this.documentUp$.pipe(first()), move$)),
        withLatestFrom(this.nodeMouseDown$, (event, { data }) => ({ event, data })),
        tap(({ event, data }) => {
          const { pageX, pageY } = event
          const { width, height, radius } = data
          const { render: { chart } } = this.activeWidget
          const zoom = chart.getZoom()
          // 设置克隆节点的位置
          anime.set(this.cloneNode, {
            top: pageY - this.yDistance,
            left: pageX - this.xDistance
          })
          // 设置克隆节点在视图区域的动画效果
          anime({
            targets: this.cloneNode,
            transformOrigin: `${this.xDistance * 96 / width}px ${this.yDistance * 96 / height}px`,
            width: this.isWithinTopologyScope(event) ? width * zoom : 96,
            height: this.isWithinTopologyScope(event) ? height * zoom : 96,
            borderRadius: this.isWithinTopologyScope(event) ? radius : 0,
            scale: this.isWithinTopologyScope(event) ? this.scale : 1,
            duration: 35,
            easing: 'linear'
          })
        }),
        filter(({ event }) => event.type === 'mouseup')
      )
      .subscribe(({ event, data }) => {
        if (this.isWithinTopologyScope(event)) {
          const { render: { initConfig, chart } } = this.activeWidget
          const { pageX, pageY } = event
          // 将屏幕/页面坐标转换为视口坐标
          const topologyCoordinate = chart.getPointByClient(pageX, pageY)
          const { x, y, width, height } = this.cloneNode.getBoundingClientRect()
          const zoom = chart.getZoom()
          const distance = {
            x: (x + (width / 2) - pageX) / this.scale / zoom,
            y: (y + (height / 2) - pageY) / this.scale / zoom
          }
          const nodeFactory = Factory.createNodeFactory()
          const node = nodeFactory.create({
            ...data,
            x: topologyCoordinate.x + distance.x,
            y: topologyCoordinate.y + distance.y,
            size: [data.width, data.height]
          })
          initConfig.nodes.push(node)
          chart.changeData(initConfig)
        }
        // 从当前文档中移除该dom节点
        document.body.removeChild(this.cloneNode)
      })
  },
  methods: {
    ...mapMutations('screen', {
      addWidget: ScreenMutations.ADD_WIDGET,
      activationWidget: ScreenMutations.ACTIVATION_WIDGET
    }),
    isWithinScope ({ pageX, pageY }) {
      const { xRange, yRange } = this.view.area
      return (pageX >= xRange.min && pageX <= xRange.max) &&
        (pageY >= yRange.min && pageY <= yRange.max)
    },
    /**
     * 获取拓扑部件区域信息
     * @returns {{xRange: *, yRange: *}}
     */
    getTopologyArea () {
      const { render: { container } } = this.activeWidget
      const { x, y, width, height } = container.getBoundingClientRect()
      return {
        xRange: new Range(x, x + width),
        yRange: new Range(y, y + height)
      }
    },
    /**
     * 鼠标是否在拓扑部件内
     * @param pageX
     * @param pageY
     * @returns {boolean|boolean}
     */
    isWithinTopologyScope ({ pageX, pageY }) {
      const { xRange, yRange } = this.topologyArea
      return (pageX >= xRange.min && pageX <= xRange.max) &&
        (pageY >= yRange.min && pageY <= yRange.max)
    }
  },
  beforeDestroy () {
    this.isSubscribed = false
  }
}
</script>

<style scoped lang="less">
.template {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  width: 240px;
  background: white;

  &__header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    height: 48px;
    box-shadow: 0 2px 8px #f0f1f2;
    z-index: 3;

    p {
      flex: none;
      margin: 0;
      padding: 0 16px;
    }
  }

  &__list {
    position: relative;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    align-content: flex-start;
    box-sizing: border-box;
    min-height: calc(100vh - 102px);
    box-shadow: 4px 8px 8px 0 rgba(0, 0, 0, .12);
    z-index: 2;
    overflow: auto;
  }

  &__item {
    flex: none;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    height: 96px;
    width: 96px;
    margin-top: 16px;
    background: white;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
      0 1px 3px 0 rgba(0, 0, 0, 0.12);
    /*transition: transform, width, height 1350ms cubic-bezier(0, 1, 0.85, 1);*/

    i {
      font-size: 32px;
    }

    p {
      color: #757575;
      margin: 8px 0 0 0;
      font-size: 14px;
      font-weight: bold;
    }

    &--expand {
      transform-origin: top left;
      flex-flow: column nowrap !important;
      justify-content: space-between !important;
      align-items: flex-start;
    }
  }

  &__sign {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    pointer-events: none;

    &.row-line {
      height: 48px;
      width: 100%;
      flex-flow: row nowrap !important;
      justify-content: space-between !important;
      padding: 0 16px;
    }
  }

  &__topology {
    width: 100%;
    height: 100%;
    padding: 16px;
    display: grid;
    grid-template-rows: repeat(2, 96px);
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
  }

  &__node {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 96px;
    height: 96px;
    background: white;
    border-radius: 5px;
    box-shadow: 5px 5px 16px 10px rgba(0, 0, 0, .03);
    z-index: 2;

    i {
      pointer-events: none;
      font-size: 32px;
    }

    p {
      pointer-events: none;
      color: #757575;
      margin: 8px 0 0 0;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
