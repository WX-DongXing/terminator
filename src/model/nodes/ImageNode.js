/**
* 拓扑图片节点
* Author: dong xing
* Date: 2020/2/11
* Time: 3:17 下午
* Email: dong.xing@outlook.com
*/

import Node from './index'

const defaultClipCfg = {
  show: false
}

export default class ImageNode extends Node {
  constructor ({
    img = 'https://yyb.gtimg.com/aiplat/page/product/visionimgidy/img/demo6-16a47e5d31.jpg?max_age=31536000',
    clipCfg = defaultClipCfg,
    ...node
  }) {
    super(node)
    this.img = img
    this.clipCfg = clipCfg
  }
}
