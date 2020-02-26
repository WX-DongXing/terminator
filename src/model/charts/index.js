/**
* echarts 图表对象
* Author: dong xing
* Date: 2019/11/25
* Time: 4:55 下午
* Email: dong.xing@outlook.com
*/
import anime from 'animejs'
import echarts from 'echarts'
import _ from 'lodash'

export default class Chart {
  constructor ({ widget }) {
    this.container = document.getElementById(widget.widgetId)
    this.chartConfig = {}
    this.setContainer(widget)
    this.init(widget)
  }

  /**
   * 初始设置图表位置尺寸
   * @param config
   */
  setContainer ({ config }) {
    const {
      width, height, top, left, zIndex
    } = config.commonConfig
    anime.set(this.container, {
      width,
      height,
      top,
      left,
      zIndex
    })
  }

  /**
   * 初始化图表
   * @param widget
   */
  init ({ config }) {
    this.chart = echarts.init(this.container, '', {
      renderer: 'canvas'
    })
    this.mergeOption(config)
  }

  /**
   * 图表resize
   */
  resize () {
    this.chart.resize()
  }

  /**
   * 重置图表默认配置
   */
  reset () {
    this.chart.setOption({})
  }

  /**
   * 映射成 echarts 配置项
   */
  // eslint-disable-next-line class-methods-use-this
  mappingOption () {}

  /**
   * 设置新的配置项渲染图表
   * @param config widget 配置项
   */
  mergeOption (config) {
    // 向外暴露 echarts 配置
    this.chartConfig = this.mappingOption(config)
    // 如果数据为空则清空图表
    if (_.isEmpty(this.chartConfig.series)) {
      this.chart.clear()
    }
    // 重新配置图表
    this.chart.setOption(this.chartConfig)
  }

  /**
   * 销毁事件
   */
  destroy () {}
}
