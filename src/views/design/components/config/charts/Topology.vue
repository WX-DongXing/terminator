/**
* 拓扑配置
* Author: dong xing
* Date: 2020/1/13
* Time: 4:12 下午
* Email: dong.xing@outlook.com
*/

<template>
  <div class="comment-template">
    <div class="comment-template__header">
      <p class="comment-template__name">拓扑图</p>
      <a-popconfirm
        title="从视图中删除该部件?"
        placement="left"
        @confirm="remove"
        okText="确定"
        cancelText="取消"
      >
        <a-button shape="circle" type="danger" icon="delete" />
      </a-popconfirm>
    </div>
    <div class="topology-config">
      <a-tabs
        defaultActiveKey="1"
        tabPosition="top"
        :style="{ height: '100%'}"
      >
        <a-tab-pane tab="公共属性" key="1">

          <a-collapse defaultActiveKey="1" :bordered="false">

            <!-- S 尺寸 -->
            <a-collapse-panel header="尺寸" key="1">

              <div class="comment-template__item">
                <p class="comment-template__leading">宽:</p>
                <div class="comment-template__inner">
                  <a-input
                    type="number"
                    v-model.number="config.commonConfig.width"
                    min="0"
                    @change="change('size', 'width')" />
                </div>
              </div>
              <!-- / 宽 -->

              <div class="comment-template__item">
                <p class="comment-template__leading">高:</p>
                <div class="comment-template__inner">
                  <a-input
                    type="number"
                    v-model.number="config.commonConfig.height"
                    min="0"
                    @change="change('size', 'height')" />
                </div>
              </div>
              <!-- / 高 -->

            </a-collapse-panel>
            <!-- E 尺寸 -->

            <!-- S 位置 -->
            <a-collapse-panel header="位置" key="2">

              <div class="comment-template__item">
                <p class="comment-template__leading">X:</p>
                <div class="comment-template__inner">
                  <a-input
                    type="number"
                    v-model.number="config.commonConfig.left"
                    min="0"
                    @change="change('position')" />
                </div>
              </div>
              <!-- / x坐标位置 -->

              <div class="comment-template__item">
                <p class="comment-template__leading">Y:</p>
                <div class="comment-template__inner">
                  <a-input
                    type="number"
                    v-model.number="config.commonConfig.top"
                    min="0"
                    @change="change('position')" />
                </div>
              </div>
              <!-- / y坐标位置 -->

            </a-collapse-panel>
            <!-- E 位置 -->

          </a-collapse>

        </a-tab-pane>

        <a-tab-pane tab="专有属性" key="2">

          <div class="topology-proprietary-template">

            <a-collapse :activeKey="activePanel" :bordered="false">

              <!-- S 操作 -->
              <a-collapse-panel header="操作" key="1">

                <div class="comment-template__item">
                  <p class="comment-template__leading">编辑:</p>
                  <div class="comment-template__inner topology-config__editable">
                    <a-switch
                      checkedChildren="开"
                      unCheckedChildren="关"
                      :checked="topologyEditable"
                      @change="topologyEdit" />
                  </div>
                </div>
                <!-- / 编辑 -->

                <div v-if="topologyEditable">

                  <div class="comment-template__item">
                    <p class="comment-template__leading">尺寸:</p>
                    <div class="comment-template__inner topology-config__editable">
                      <a-switch
                        checkedChildren="开"
                        unCheckedChildren="关"
                        v-model="topologyResizable"
                        @change="topologyResize" />
                    </div>
                  </div>
                  <!-- / 尺寸 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">网格:</p>
                    <div class="comment-template__inner topology-config__editable">
                      <a-switch
                        checkedChildren="开启"
                        unCheckedChildren="关闭"
                        v-model="isDisplayGrid"
                        @change="gridChange" />
                    </div>
                  </div>
                  <!-- / 网格 -->

                  <div class="comment-template__item">
                    <p class="comment-template__leading">模式:</p>
                    <div class="comment-template__inner topology-config__editable">
                      <a-radio-group
                        buttonStyle="solid"
                        v-model="mode"
                        @change="modeChange">
                        <a-radio-button value="default">默认</a-radio-button>
                        <a-radio-button value="addEdge">连线</a-radio-button>
                      </a-radio-group>
                    </div>
                  </div>
                  <!-- / 模式 -->

                  <div class="comment-template__item" v-if="mode === 'addEdge'">
                    <p class="comment-template__leading">连线形状:</p>
                    <div class="comment-template__inner topology-config__editable">
                      <a-radio-group
                        buttonStyle="solid"
                        v-model="edge.shape"
                        @change="edgeConfigChange">
                        <a-radio-button value="line">直线</a-radio-button>
                        <a-radio-button value="polyline">折线</a-radio-button>
                        <a-radio-button value="cubic">弧线</a-radio-button>
                      </a-radio-group>
                    </div>
                  </div>
                  <!-- / 连线形状 -->

                  <EdgeTemplate
                    :model="edge"
                    v-if="edge && mode === 'addEdge'"
                    @change="edgeConfigChange" />
                  <!-- / 通用边编辑模板 -->

                </div>

              </a-collapse-panel>
              <!-- E 操作 -->

            </a-collapse>

            <!-- S 节点通用配置 -->
            <CommonNodeTemplate v-if="topologyEditable && activeNode && mode === 'default'" ref="commonNodeTemplate">

            </CommonNodeTemplate>
            <!-- S 节点通用配置 -->

            <!-- E 节点通用配置 -->
            <CommonEdgeTemplate v-if="topologyEditable && activeEdge" ref="commonEdgeTemplate" />
            <!-- E 节点通用配置 -->

          </div>

        </a-tab-pane>

        <a-tab-pane tab="数据配置" key="3">

          <!-- S 数据配置模板 -->
          <DataSourceTemplate />
          <!-- E 数据配置模板 -->

        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import anime from 'animejs'
import Grid from '@antv/g6/build/grid'
import { mapMutations } from 'vuex'
import { ScreenMutations } from '@/store/modules/screen'
import ColorPicker from '@/components/colorPicker/index'
import CommonTemplate from '../common/index'
import ChartProprietaryTemplate from '../chartProprietary/index'
import DataSourceTemplate from '../dataSource/index'
import WrapperService from '@/components/wrapper/WrapperService'
import CommonNodeTemplate from '@/views/design/components/config/nodes'
import CommonEdgeTemplate from '@/views/design/components/config/edges'
import EdgeTemplate from '@/views/design/components/config/edges/edge'

export default {
  name: 'Topology',
  mixins: [CommonTemplate],
  components: {
    ColorPicker,
    ChartProprietaryTemplate,
    DataSourceTemplate,
    CommonNodeTemplate,
    CommonEdgeTemplate,
    EdgeTemplate
  },
  data: () => ({
    // 拓扑尺寸编辑
    topologyResizable: true,
    // 拓扑模式
    mode: 'default',
    // 是否显示拓扑网格
    isDisplayGrid: false,
    // 选择器服务
    wrapperService: new WrapperService()
  }),
  computed: {
    // 激活的面板
    activePanel () {
      return (this.activeNode && this.mode === 'default') || this.activeEdge ? 2 : 1
    },
    // 通用边配置
    edge () {
      return _.cloneDeep(this.edgeConfig)
    }
  },
  created () {
    this.resetTopologyState()
  },
  methods: {
    ...mapMutations('screen', {
      modifyTopologyEditable: ScreenMutations.MODIFY_TOPOLOGY_EDITABLE_STATUS,
      activateNode: ScreenMutations.ACTIVATE_NODE,
      resetTopologyState: ScreenMutations.RESET_TOPOLOGY_STATE,
      setEdgeConfig: ScreenMutations.SET_EDGE_CONFIG
    }),
    /**
     * 移除拓扑部件
     */
    remove () {
      this.topologyEditable && this.topologyEdit()
      this.removeWidget({ widgetId: this.activeWidget.widgetId })
    },
    /**
     * 拓扑图是否可编辑
     */
    topologyEdit () {
      // 更改拓扑图编辑状态
      this.modifyTopologyEditable({
        editable: !this.topologyEditable
      })

      // 对当前已激活可编辑的拓扑部件添加样式，以标注状态
      const { render: { container } } = this.activeWidget
      container.className = this.topologyEditable ? 'widget topology-widget' : 'widget'

      // 开启编辑时
      if (this.topologyEditable) {
        // 检查网格开启状态
        this.checkGridStatus()
      } else {
        // 取消编辑时选中该拓扑部件, 重置状态
        // 选中拓扑部件
        this.wrapperService.next({
          el: 'topology',
          value: true,
          widget: this.activeWidget
        })
        this.topologyResizable = true
        // 重置拓扑对象状态
        this.resetTopologyState()
      }

      // 打开元素添加列表
      const [topology] = document.getElementsByClassName('topology')
      // FLIP动画
      if (this.topologyEditable) {
        // 正向动画
        // 记录初始位置
        const firstRect = topology.getBoundingClientRect()
        // 使其布局及样式发生改变
        anime.set(topology, {
          position: 'absolute',
          margin: 0,
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        })
        // 记录最终位置
        const lastRect = topology.getBoundingClientRect()
        // 翻转动画
        topology.animate([{
          transform: `
            translate(${firstRect.left - lastRect.left}px, ${firstRect.top - lastRect.top}px)
            scale(${firstRect.width / lastRect.width}, ${firstRect.height / lastRect.height})
         `
        }, {
          transform: 'none'
        }], {
          duration: 300,
          easing: 'cubic-bezier(0.2, 0, 0.2, 1)',
          fill: 'both'
        })
      } else {
        // 逆向动画
        const firstRect = topology.getBoundingClientRect()
        // 使其布局及样式发生改变
        anime.set(topology, {
          position: 'relative',
          margin: '16px 0 0 0',
          top: 'none',
          left: 'none',
          width: '96px',
          height: '96px'
        })
        // 记录最终位置
        const lastRect = topology.getBoundingClientRect()

        requestAnimationFrame(() => {
          // 翻转动画
          topology.animate([{
            transformOrigin: 'top left',
            transform: `
            translate(${firstRect.left - lastRect.left}px, ${firstRect.top - lastRect.top}px)
            scale(${firstRect.width / lastRect.width}, ${firstRect.height / lastRect.height})
          `
          }, {
            transformOrigin: 'top left',
            transform: 'none'
          }], {
            duration: 300,
            easing: 'cubic-bezier(0.2, 0, 0.2, 1)',
            fill: 'both'
          })
        })
      }
    },
    /**
     * 拓扑图是否可更改尺寸
     */
    topologyResize () {
      this.wrapperService.next({
        el: 'topology',
        value: this.topologyResizable,
        widget: this.activeWidget
      })
    },
    /**
     * 模式更改
     */
    modeChange () {
      const { render: { chart } } = this.activeWidget
      chart.setMode(this.mode)
    },
    /**
     * 边配置更改事件
     */
    edgeConfigChange () {
      this.setEdgeConfig({
        edgeConfig: this.edge
      })
    },
    /**
     * 检查是否开启网格
     */
    checkGridStatus () {
      const { render: { chart } } = this.activeWidget
      const [hasGridPlugin] = chart.get('plugins')
      this.isDisplayGrid = !!hasGridPlugin
    },
    /**
     * 拓扑网格显示更改事件
     */
    gridChange () {
      const { render: { chart } } = this.activeWidget
      const [grid] = chart.get('plugins')
      this.isDisplayGrid ? chart.addPlugin(new Grid()) : chart.removePlugin(grid)
    }
  }
}
</script>

<style scoped lang="less">
.topology-config {

  &__editable {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;
  }
}
.topology-proprietary-template {
  height: calc(100vh - 224px);
  overflow: auto;
}
</style>
