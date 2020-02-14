/**
* 拓扑图属性配置对象
* Author: dong xing
* Date: 2020/1/14
* Time: 10:53 上午
* Email: dong.xing@outlook.com
*/

export default class TopologyProprietaryConfig {
  constructor ({
    nodes = [],
    edges = [],
    groups = []
  }) {
    this.nodes = nodes
    this.edges = edges
    this.groups = groups
  }
}
