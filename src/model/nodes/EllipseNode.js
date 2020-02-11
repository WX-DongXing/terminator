/**
* 拓扑椭圆节点
* Author: dong xing
* Date: 2020/2/11
* Time: 3:16 下午
* Email: dong.xing@outlook.com
*/

import Node from './index'

export default class EllipseNode extends Node {
  constructor ({ icon, ...node }) {
    super(node)
    this.icon = icon
  }
}
