/**
* 部件对象
* Author: dong xing
* Date: 2019/11/13
* Time: 2:01 下午
* Email: dong.xing@outlook.com
*/
import _ from 'lodash'
import uuid from 'uuid/v4'
import anime from 'animejs'
import Config from '../config'
import AnimateProps from '@/model/animateProps'
import store from '@/store'

export default class Widget {
  constructor ({
    widgetId = 'widget-' + uuid(),
    config = {},
    animateProps = {},
    render = null
  }) {
    this.widgetId = widgetId
    this.config = new Config(config)
    this.animateProps = new AnimateProps({ ...config.commonConfig, ...animateProps })
    this.render = render
    this.animation = null
  }

  /**
   * 获取部件配置
   * @returns {*}
   */
  getOption () {
    const { widgetId, config, animateProps } = this
    return {
      widgetId,
      config: _.cloneDeep(config),
      animateProps: _.cloneDeep(animateProps)
    }
  }

  /**
   * 生成动画时间轴配置
   */
  generateTimeline () {
    this.animation = anime.timeline({
      targets: `#${this.widgetId}`,
      duration: store.state.screen.maxTime || 10000, // Can be inherited
      easing: 'linear', // Can be inherited
      direction: 'normal', // Is not inherited
      loop: false, // Is not inherited,
      autoplay: false
    })
    const animatedProps = this.animateProps.flatProps()
    if (animatedProps && animatedProps.length > 0) {
      animatedProps.forEach(({ time, animateProp }) => {
        this.animation.add(animateProp, time)
      })
    }
  }

  play () {
    this.animation && this.animation.play()
  }

  pause () {
    this.animation && this.animation.pause()
  }

  restart () {
    this.animation && this.animation.restart()
  }

  seek (timeStamp) {
    this.animation && this.animation.seek(timeStamp || 1)
  }
}
