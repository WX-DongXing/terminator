/**
* 拓扑圆形节点
* Author: dong xing
* Date: 2020/2/11
* Time: 11:14 上午
* Email: dong.xing@outlook.com
*/
import Node from './index'
import { TopologyIcon } from '../common'

export default class CircleNode extends Node {
  constructor ({ icon, ...node }) {
    super(node)
    this.icon = new TopologyIcon(icon || {})
  }
}
