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
  ['skewY', 'Y方向倾斜']
])

export default class AnimateProps {
  constructor ({
    width,
    height,
    top,
    left,
    scaleX,
    scaleY,
    scaleZ,
    translateX,
    translateY,
    translateZ,
    rotateX,
    rotateY,
    rotateZ,
    skewX,
    skewY
  }) {
    this.width = width
    this.height = height
    this.top = top
    this.left = left
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
    this.props = this.getProps()
  }

  getProps () {
    return Object.entries(this).map(([key, value]) => {
      return new Props({
        name: PropsNames.get(key),
        type: key.toString(),
        value
      })
    })
  }
}
