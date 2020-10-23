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
    this.width = new Props({ name: '宽', type: 'width', value: width })
    this.height = new Props({ name: '高', type: 'height', value: height })
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
  }

  getProps () {
  }
}
