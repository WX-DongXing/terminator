import anime from 'animejs'

export default class Element {
  constructor ({ widget, element }) {
    this.container = document.getElementById(widget.widgetId)
    this.element = element
    this.setContainer(widget)
    this.setConfig(widget.config)
  }

  /**
   * 初始设置容器位置尺寸
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
   * 设置基本样式
   * @param config
   */
  setStyle (config) {
    const {
      colorMode, backgroundColor, border
    } = config.commonConfig
    anime.set(this.container, {
      ...border.getOption(),
      background: colorMode === 'single' ? backgroundColor : `linear-gradient(${backgroundColor.angle}deg, ${backgroundColor.start}, ${backgroundColor.end})`
    })
  }

  /**
   * 设置专有属性样式，与图表对象使用同一方法命名
   */
  mergeOption (config) {}

  /**
   * 完整配置设置
   * @param config
   */
  setConfig (config) {
    this.setStyle(config)
    this.mergeOption(config)
  }

  resize () {}

  destroy () {}
}
