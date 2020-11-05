import _ from 'lodash'

class Props {
  constructor ({
    name,
    type,
    value,
    timeline = []
  }) {
    this.name = name
    this.type = type
    this.value = value
    this.timeline = timeline
  }
}

const PropsNames = new Map([
  ['width', '宽'],
  ['height', '高'],
  ['top', 'Y坐标'],
  ['left', 'X坐标'],
  ['scaleX', 'X方向缩放'],
  ['scaleY', 'Y方向缩放'],
  ['scaleZ', 'Z方向缩放'],
  ['translateX', 'X方向位移'],
  ['translateY', 'Y方向位移'],
  ['translateZ', 'Z方向位移'],
  ['rotateX', 'X方向旋转'],
  ['rotateY', 'Y方向旋转'],
  ['rotateZ', 'Z方向旋转'],
  ['skewX', 'X方向倾斜'],
  ['skewY', 'Y方向倾斜'],
  ['opacity', '不透明度']
])

const SpecialProps = ['width', 'height', 'top', 'left']

export default class AnimateProps {
  constructor ({
    width = 0,
    height = 0,
    top = 0,
    left = 0,
    opacity = 1,
    scaleX = 1,
    scaleY = 1,
    scaleZ = 1,
    translateX = 0,
    translateY = 0,
    translateZ = 0,
    rotateX = 0,
    rotateY = 0,
    rotateZ = 0,
    skewX = 0,
    skewY = 0,
    props = null
  }) {
    this.width = width
    this.height = height
    this.top = top
    this.left = left
    this.opacity = opacity
    this.scaleX = scaleX
    this.scaleY = scaleY
    this.scaleZ = scaleZ
    this.translateX = translateX
    this.translateY = translateY
    this.translateZ = translateZ
    this.rotateX = rotateX
    this.rotateY = rotateY
    this.rotateZ = rotateZ
    this.skewX = skewX
    this.skewY = skewY
    this.props = props || this.getProps()
  }

  /**
   * 获取配置属性列表
   * @returns {Props[]}
   */
  getProps () {
    return Object.entries(_.omit(this, ['props'])).map(([key, value]) => {
      return new Props({
        name: PropsNames.get(key),
        type: key.toString(),
        value
      })
    })
  }

  /**
   * 同步配置
   * @param commonConfig
   */
  syncSpecialProps (commonConfig) {
    Object.assign(this, _.pick(commonConfig, SpecialProps))
    this.props = this.getProps()
  }

  /**
   * 合并动画属性
   */
  mergeProps () {
    return this.props
      .flatMap(prop => prop.timeline)
      .reduce((acc, cur) => {
        const collage = acc.find(item => item.time === cur.time)
        if (collage) {
          Object.assign(collage.propsObject, { [cur.type]: cur.value })
        } else {
          acc.push({ time: cur.time, propsObject: { [cur.type]: cur.value } })
        }
        return acc
      }, [])
  }

  /**
   * 打平动画属性
   */
  flatProps () {
    return _.cloneDeep(this.props).map(prop => {
      prop.timeline = prop.timeline.sort((a, b) => a.time - b.time)
        .map(({ type, value, time }, index, timeline) => {
          return {
            time: index - 1 < 0 ? 0 : (index - 1 === 0 ? 1 : timeline[index - 1].time),
            animateProp: {
              [type]: value,
              duration: index === 0
                ? 1
                : (time - timeline[index - 1].time) || 1
            }
          }
        })
      return prop
    }).flatMap(prop => prop.timeline)
  }
}
