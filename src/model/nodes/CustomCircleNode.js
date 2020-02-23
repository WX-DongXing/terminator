import Node from './index'
import { TopologyIcon } from '../common'

export default class CustomCircleNode extends Node {
  constructor ({ icon, ...node }) {
    super(node)
    this.icon = new TopologyIcon(icon)
  }
}
