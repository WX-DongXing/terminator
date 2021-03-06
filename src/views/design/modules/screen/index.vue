/**
* 视图及操作
* Date: 2019/11/13
* Time: 1:44 下午
*/
<template>
  <div class="screen">
    <div class="screen__header">
      <div class="screen__control" @click="panelControl('left')">
        <span v-if="leftPanelExpand">
          <a-icon type="menu-fold" />
        </span>
        <a-button v-else type="link" icon="appstore">组件库</a-button>
      </div>
      <div class="screen__bar">
        <div class="screen__front">

          <!-- S 比例条 -->
          <div class="scale-bar">
            <a-tooltip placement="top">
              <template slot="title">
                自动比例：{{ isAutoResize ? '已开启' : '已关闭' }}
              </template>
              <a-switch
                size="small"
                v-model="isAutoResize"
                @change="() => isAutoResize && change$.next({ type: 'resize' })" />
            </a-tooltip>
            <a-slider
              class="scale-bar__slider"
              @change="() => change$.next({ type: 'scale', value: scale })"
              :disabled="isAutoResize"
              :min="0"
              :max="2"
              :step="0.01"
              v-model="scale" />
            <p class="scale-bar__number">缩放比：{{ scale.toFixed(2) }}</p>
          </div>
          <!-- E 比例条 -->

        </div>
        <div class="screen__back">

          <a-button-group>
            <a-popconfirm
              title="确定清空画板？"
              @confirm="clear"
              okText="确定"
              cancelText="取消">

              <a-tooltip>
                <template slot="title">
                  清空
                </template>
                <a-button type="link" class="screen__clear" icon="delete" />
              </a-tooltip>

            </a-popconfirm>

            <a-upload
              name="file"
              :before-upload="importConfig"
              :show-upload-list="false"
              :multiple="false"
            >
              <a-tooltip>
                <template slot="title">
                  导入
                </template>
                <a-button type="link" icon="upload" />
              </a-tooltip>
            </a-upload>

            <a-tooltip>
              <template slot="title">
                导出
              </template>
              <a-button type="link" icon="export" @click="exportFile" />
            </a-tooltip>

            <a-tooltip>
              <template slot="title">
                保存
              </template>
              <a-popconfirm placement="top" ok-text="保存" cancel-text="取消" @confirm="save">
                <template slot="title">
                  <a-input placeholder="应用名称" v-model="appName" />
                </template>
                <a-button type="link" icon="save" />
              </a-popconfirm>
            </a-tooltip>

            <a-tooltip>
              <template slot="title">
                预览
              </template>
              <a-button type="link" icon="eye" @click="preview" />
            </a-tooltip>

            <a-button type="link" @click="() => $refs.app.open()">应用列表</a-button>

          </a-button-group>
        </div>
      </div>
      <div class="screen__control" @click="panelControl('right')">
        <span v-if="rightPanelExpand">
          <a-icon type="menu-unfold" />
        </span>
        <a-button v-else type="link" icon="setting">配置</a-button>
      </div>
    </div>

    <!-- S 应用列表弹框 -->
    <APPModal ref="app"/>
    <!-- E 应用列表弹框 -->

    <splitpanes class="split" horizontal @resize="panelResize" @resized="panelResized">
      <pane class="page">
        <!-- S 画板 -->
        <div
          ref="page"
          class="page"
          @click.self="() => select$.next({ el: 'view' })">

          <div class="gauge" ref="gauge"></div>
          <!-- / 标尺 -->

          <div ref="view" class="view">
            <div :class="['grid', { 'grid-show': isGrid }]"></div>

            <Widget
              v-for="widget in widgets"
              :widget="widget"
              :key="widget.widgetId"
              :ref="widget.widgetId"
              @select="(selectWidget) => select$.next({ el: 'widget', widget: selectWidget })"
            />
            <!-- / 部件渲染 -->

            <Wrapper ref="wrapper" v-stream:adjust="adjust$" />
            <!-- / 选择指示器 -->

            <Selector ref="selector" />
            <!-- / 部件多选器 -->

          </div>
          <!-- / 视图 -->

        </div>
        <!-- E 画板 -->

      </pane>
      <pane min-size="25" size="45" class="timeline">

        <animation-timeline
          :widgets="widgets"
          :fields="fields"
          @onSelect="handleSelect"
          @onUpdate="handleUpdate"
          ref="timeline" />

      </pane>
    </splitpanes>

  </div>
</template>

<script>
import _ from 'lodash'
import anime from 'animejs'
import PerfectScrollbar from 'perfect-scrollbar'
import Fingerprint from '@fingerprintjs/fingerprintjs'
import {
  fromEvent, merge, Subject, zip
} from 'rxjs'
import {
  startWith, mapTo, takeWhile,
  pluck, map, filter, takeUntil,
  withLatestFrom, tap, switchMap, first
} from 'rxjs/operators'
import { mapState, mapGetters, mapMutations } from 'vuex'
import { Splitpanes, Pane } from 'splitpanes'
import { ScreenMutations } from '@/store/modules/screen'
import { downloadFile } from '@/utils'
import { saveApp } from '@/services'
import View from '@/model/view'
import WidgetModel from '@/model/widget'
import ViewService from '../config/view'
import Wrapper from '@/components/Wrapper'
import Selector from '@/components/Selector'
import Widget from '@/components/Widget'
import AdjustMixins from '@/components/Wrapper/AdjustMixins'
import WrapperService from '@/components/Wrapper/WrapperService'
import APPModal from '@/components/APPModal'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import 'splitpanes/dist/splitpanes.css'

export default {
  name: 'Screen',
  components: {
    Wrapper,
    Widget,
    Selector,
    Splitpanes,
    Pane,
    APPModal
  },
  mixins: [AdjustMixins],
  // 选择器调整事件流
  domStreams: ['adjust$'],
  subscriptions () {
    // 画板change事件流
    this.change$ = new Subject()
    // 画板上元素触发事件流
    this.select$ = new Subject()
    return {
    }
  },
  data: () => ({
    leftPanelExpand: true,
    rightPanelExpand: true,
    backgroundColor: 'rgba(255,255,255,1)',
    scale: 1,
    isAutoResize: true,
    isSubscribed: true,
    isResize: false,
    wrapperChange$: new WrapperService().change$,
    viewChange$: new ViewService().change$,
    // 滚动条
    perfectScrollBar: null,
    // 视图配置
    viewOption: null,
    // 视图信息
    rect: null,
    // timeline 组件字段配置
    fields: {
      name: 'config.type',
      key: 'widgetId',
      width: 'config.commonConfig.width',
      height: 'config.commonConfig.height',
      top: 'config.commonConfig.top',
      left: 'config.commonConfig.left'
    },
    appName: '未命名应用'
  }),
  async created () {
    const fpPromise = Fingerprint.load()
    const fp = await fpPromise
    const finger = await fp.get()
    this.setVisitorId(finger)
  },
  mounted () {
    const { platform } = navigator
    // 如果是 windows 平台，美化滚动条
    if (platform === 'Win32' || platform === 'Windows') {
      // 设置滚动条
      this.perfectScrollBar = new PerfectScrollbar(this.$refs.page, {
        wheelSpeed: 1,
        wheelPropagation: true,
        minScrollbarLength: 20
      })
    }

    // 视图change事件处理
    merge(
      fromEvent(window, 'resize').pipe(mapTo({ type: 'resize' })),
      this.change$,
      this.viewChange$
    )
      .pipe(
        takeWhile(() => this.isSubscribed),
        startWith({ type: 'init' })
      )
      .subscribe((event) => {
        // 更新滚动条
        this.perfectScrollBar && this.perfectScrollBar.update()
        // 初始化场景进行样式设置
        if (event.type === 'init' && !this.view.config) {
          this.initStyle(event)
        } else {
          // 其他场景中，设置画板样式
          this.setStyle(event)
        }
      })

    // 选择激活的部件
    merge(
      this.select$,
      // 作为子元素的选择器事件取消冒泡，只有 mousedown 和 mouseup 时间逐次在 view 视图上触发时，才响应为一次事件
      zip(
        fromEvent(this.$refs.view, 'mousedown', { capture: false }),
        fromEvent(this.$refs.view, 'mouseup', { capture: false })
      ).pipe(
        map(events => ({ el: 'view', events })),
        filter(({ events: [mousedownEvent] }) => [...mousedownEvent.target.classList].includes('view'))
      ),
      this.wrapperChange$
    )
      .pipe(
        takeWhile(() => this.isSubscribed),
        // 当拓扑视图在编辑时禁用其他部件的激活功能
        filter(({ el }) => !this.topologyEditable || el === 'topology')
      )
      .subscribe(({ el, widget, value }) => {
        let activeWidget
        let styles = {}
        switch (el) {
          case 'view':
            activeWidget = this.view
            styles = { display: 'none' }
            break
          case 'widget':
            activeWidget = widget
            // eslint-disable-next-line no-case-declarations
            const {
              config: {
                commonConfig: { width, height, top, left }
              }
            } = widget
            styles = {
              display: 'block',
              width,
              height,
              top,
              left
            }
            break
          case 'topology':
            // 拓扑视图尺寸开关开闭时触发
            activeWidget = widget
            styles = {
              display: value ? 'block' : 'none'
            }
            break
          default:
            activeWidget = null
            break
        }
        if (el !== 'adjust') {
          // 设置激活的部件
          this.activateWidget({
            widget: activeWidget
          })
          // 设置选择器样式
          this.$refs.wrapper.setSize(styles)
        }
      })

    // 部件尺寸调整
    this.adjust$
      .pipe(
        takeWhile(() => this.isSubscribed),
        pluck('event', 'msg')
      )
      .subscribe((mutation) => {
        const { widgetId } = this.activeWidget
        const [targetComponent] = this.$refs[widgetId]
        const { event: { mouseType, eventType } } = mutation
        // 当鼠标抬起时更新部件位置状态
        if (mouseType === 'mouseup') {
          const {
            top, left, width, height
          } = window.getComputedStyle(targetComponent.$el, null)
          const widgetPositionState = {
            top: Number(top.split('px')[0]) || 0,
            left: Number(left.split('px')[0]) || 0,
            width: Number(width.split('px')[0]) || 0,
            height: Number(height.split('px')[0]) || 0
          }
          // 更新部件位置信息
          const widget = _.cloneDeep(this.activeWidget)
          Object.assign(widget.config.commonConfig, widgetPositionState)
          this.activateWidget({ widget })
          return
        }
        // 调整部件大小
        this.adjust({
          target: targetComponent.$el,
          mutation
        })
        // 在非移动情况触发时，调整图表尺寸
        if (eventType !== 'MOVE') {
          this.activeWidget.render.resize()
        }
      })

    const mouseDown$ = fromEvent(window, 'mousedown')
    const mouseMove$ = fromEvent(window, 'mousemove')
    const mouseUp$ = fromEvent(window, 'mouseup')

    // alt键盘事件监听
    mouseDown$
      .pipe(
        takeWhile(_ => this.isSubscribed),
        filter(event => event.altKey),
        tap(_ => (this.rect = this.$refs.view.getBoundingClientRect())),
        map(_ => mouseMove$.pipe(takeUntil(mouseUp$))),
        switchMap(move$ => merge(mouseUp$.pipe(first()), move$)),
        withLatestFrom(mouseDown$, (move, down) => ([down, move])),
        tap(([down, move]) => {
          const { x, y } = this.rect
          const { pageX: downPageX, pageY: downPageY } = down
          const { pageX: movePageX, pageY: movePageY } = move
          const translateX = (downPageX - x) / this.scale
          const translateY = (downPageY - y) / this.scale
          // Todo with in scope 只有在视图区域中方可操作
          anime.set(this.$refs.selector.$el, {
            display: 'block',
            translateX: (movePageX - downPageX) > 0 ? translateX : translateX + (movePageX - downPageX),
            translateY: (movePageY - downPageY) > 0 ? translateY : translateY + (movePageY - downPageY),
            width: Math.abs(movePageX - downPageX) / this.scale,
            height: Math.abs(movePageY - downPageY) / this.scale
          })
        }),
        filter(([_, event]) => event.type === 'mouseup')
      )
      .subscribe(_ => {
        console.log(this.widgets)
      })
  },
  computed: {
    ...mapState('screen', ['view', 'activeWidget', 'topologyEditable', 'isGrid']),
    ...mapGetters('screen', ['widgets', 'visitorId'])
  },
  methods: {
    ...mapMutations('screen', {
      setView: ScreenMutations.SET_VIEW,
      activateWidget: ScreenMutations.ACTIVATE_WIDGET,
      updateTransition: ScreenMutations.UPDATE_TRANSITION,
      setVisitorId: ScreenMutations.SET_VISITOR_ID
    }),
    /**
     * 选中部件
     */
    handleSelect (item) {
      const widget = this.widgets.find(widget => widget.widgetId === item.widgetId)
      // 激活部件
      this.activateWidget({ widget })
      // 选择器选中该部件
      this.select$.next({ el: 'widget', widget })
    },
    /**
     * timeline update
     */
    handleUpdate (option) {
      this.updateTransition(option)
    },
    /**
     * 面板resize事件
     * @param event
     */
    panelResize (event) {
      this.$refs.timeline.resize()
    },
    /**
     * 面板resized事件
     * @param event
     */
    panelResized (event) {
      this.isAutoResize && this.change$.next({ type: 'resize' })
    },
    /**
     * 左右panel展开与否
     * @param type 左右panel
     */
    panelControl (type) {
      const mapping = new Map([
        ['left', 'leftPanelExpand'],
        ['right', 'rightPanelExpand']
      ])
      this[mapping.get(type)] = !this[mapping.get(type)]
      this.$emit(type, this[mapping.get(type)])
      setTimeout(() => {
        this.change$.next({ type: 'resize' })
      }, 400)
    },
    /**
     * 初始化视图样式
     * @param event
     */
    initStyle (event) {
      // 初始化获取设备宽高
      const clientWidth = document.body.clientWidth
      const clientHeight = document.body.clientHeight
      const { width, height } = this.$refs.page.getBoundingClientRect()
      const xScale = ((width - 32) / clientWidth)
      const yScale = ((height - 32) / clientHeight)
      this.scale = Math.min(xScale, yScale)

      // 设置视图宽高及比例
      anime({
        targets: this.$refs.view,
        width: clientWidth,
        height: clientHeight,
        scale: this.scale,
        duration: 150,
        easing: 'linear'
      })

      // 预留标尺真实宽高
      anime({
        targets: this.$refs.gauge,
        width: clientWidth * this.scale + 32,
        height: clientHeight * this.scale + 32,
        duration: 150,
        easing: 'linear'
      })

      // 初始化视图
      this.setView({
        view: new View({
          gauge: this.$refs.gauge,
          parent: this.$refs.page,
          scale: this.scale,
          ...this.view,
          config: {
            commonConfig: {
              width: clientWidth,
              height: clientHeight
            }
          }
        })
      })
    },
    /**
     * 配置视图样式
     * @param event
     */
    setStyle (event) {
      const {
        width: pageWidth,
        height: pageHeight
      } = this.$refs.page.getBoundingClientRect()
      const {
        config: {
          commonConfig: {
            width, height
          },
          proprietaryConfig: {
            mode,
            backgroundColor,
            backgroundImage,
            backgroundRepeat,
            backgroundSize
          }
        }
      } = this.view
      const xScale = ((pageWidth - 32) / width)
      const yScale = ((pageHeight - 32) / height)

      // 如果手动调整缩放条，则直接设置缩放比例
      if (event.type === 'scale') {
        this.scale = event.value
      } else {
        // 如果开启自动调整则设置缩放
        if (this.isAutoResize) {
          // 根据宽高最小的比例设置缩放，其余更改只更新该类型变量数据
          this.scale = Math.min(xScale, yScale)
        }
      }

      // 更新视图缩放
      this.setView({
        view: Object.assign(new View({
          ...this.view,
          scale: this.scale
        }))
      })

      anime.set(this.$refs.view, {
        backgroundImage: mode === 'image' ? `url(${backgroundImage})` : '',
        backgroundRepeat,
        backgroundSize
      })

      anime({
        targets: this.$refs.view,
        width,
        height,
        scale: this.scale,
        background: mode === 'single' ? backgroundColor : `linear-gradient(${backgroundColor.angle}deg, ${backgroundColor.start}, ${backgroundColor.end})`,
        duration: 150,
        easing: 'linear'
      })
      anime({
        targets: this.$refs.gauge,
        width: width * this.scale + 32,
        height: height * this.scale + 32,
        duration: 150,
        easing: 'linear'
      })
    },
    /**
     * 保存视图配置
     */
    async save () {
      try {
        const setting = this.view.getOption()
        if (!this.appName) {
          this.$message.error('保存失败，请命名应用！')
          return
        }
        const { appName: name, visitorId } = this
        await saveApp({ name, visitorId, setting })
        this.$message.success('已保存！')
      } catch (e) {
        this.$message.error(e)
      }
    },
    /**
     * 预览
     */
    preview () {
      this.$parent.preview()
    },
    /**
     * 导入视图配置
     * @param file
     * @returns {boolean}
     */
    importConfig (file) {
      // 清空画布
      this.clear()
      const reader = new FileReader()
      reader.onload = () => {
        // 清空当前视图配置
        this.clear()
        // 保留当前视图ID及名称
        this.viewOptions = _.omit(JSON.parse(reader.result), ['id', 'name'])
        // 实例化部件对象
        const widgets = this.viewOptions.widgets.map(config => new WidgetModel(config))
        // 更新视图对象
        this.setView({
          view: new View({
            ...this.view,
            ...this.viewOptions,
            widgets
          })
        })
        // 设置视图样式
        this.setStyle({ type: 'input' })
      }
      reader.readAsText(file)
      return false
    },
    /**
     * 导出视图配置至json文件
     */
    exportFile () {
      const option = this.view.getOption()
      downloadFile(`${this.view.id}.json`, JSON.stringify(option))
    },
    /**
     * 清空画板
     */
    clear () {
      const { config: { commonConfig: { width, height } } } = this.view
      const preSize = { commonConfig: { width, height } }
      // 清空部件列表
      this.setView({
        view: new View({
          gauge: this.$refs.gauge,
          parent: this.$refs.page,
          scale: this.scale,
          config: preSize
        })
      })
      // 置空激活部件
      this.activateWidget({ widget: null })
      // 初始化样式
      this.setStyle({ type: 'reset' })
      // 移除部件选择器
      anime.set('#wrapper', { display: 'none' })
    }
  },
  beforeDestroy () {
    this.isSubscribed = false
    // 销毁滚动条
    this.perfectScrollBar && this.perfectScrollBar.destroy()
  }
}
</script>

<style scoped lang="less">
.screen {
  height: calc(100vh - 54px);
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: stretch;
  background: whitesmoke;

  &__header {
    position: relative;
    flex: none;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    background: white;
    box-shadow: 0 2px 8px #f0f1f2;
    z-index: 4;

    p {
      margin: 0;
    }
  }

  &__control {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    height: 100%;

    & span {
      flex: none;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      width: 48px;
      height: 100%;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  &__bar {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  &__size {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items: center;

    .ant-input-group-wrapper {
      width: 120px;
      margin-left: 16px;
    }
  }

  &__clear {
    color: #ff4d4f;

    &:hover {
      color: #ff4d4f;
    }
  }
}

.split {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  overflow: auto;
  background: #f1f1f1;
}

.page {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  overflow: auto;
  background: #f1f1f1;
}

.timeline {
  background: white !important;
  border-left: 1px solid #DADCE0;
  border-right: 1px solid #DADCE0;
}

.gauge {
  position: absolute;
  top: 0;
  left: 0;
}

.scale-bar {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  padding: 0 16px;
  height: 48px;
  background: white;
  z-index: 3;

  &__slider.ant-slider {
    width: 200px;
    margin: 0 16px;
  }

  &__number {
    width: 85px;
    margin: 0;
  }
}

.view {
  position: relative;
  height: 1080px;
  width: 1920px;
  margin: 16px 0 0 16px;
  background: white;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2),
  0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
  transform-origin: 0 0;
  overflow: hidden;
}

</style>

<style>
:root {
  --grid-color: rgba(0, 0, 0, .18);
  --grid-size: 20px;
}

.grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  pointer-events: none;
}

.grid-show {
   background-image: linear-gradient(var(--grid-color) 1px, transparent 1px),
   linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
   background-size: var(--grid-size) var(--grid-size), var(--grid-size) var(--grid-size), var(--grid-size) var(--grid-size), var(--grid-size) var(--grid-size);
   background-position:-2px -2px, -2px -2px, -1px -1px, -1px -1px;
}

</style>
