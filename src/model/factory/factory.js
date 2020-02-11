/**
* 全局工厂
* Author: dong xing
* Date: 2019/11/19
* Time: 2:53 下午
* Email: dong.xing@outlook.com
*/

import ChartFactory from './chartFactory'
import ElementFactory from './elementFactory'
import ChartProprietaryConfigFactory from './chartProprietaryConfigFactory'
import StaticDataFactory from './staticDataFactory'
import { NodeFactory } from './nodeFactory'

export default class Factory {
  // 创建图表工厂
  static createChartFactory = () => ChartFactory

  // 创建图表专有配置工厂
  static createChartProprietaryConfigFactory = () => ChartProprietaryConfigFactory

  // 创建图表静态数据配置工厂
  static createStaticDataFactory = () => StaticDataFactory

  // 创建元素工厂
  static createElementFactory = () => ElementFactory

  // 创建拓扑节点工厂
  static createNodeFactory = () => NodeFactory
}
