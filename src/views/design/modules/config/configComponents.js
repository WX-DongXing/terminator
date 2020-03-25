/**
* 模板对应配置组件
* Author: dong xing
* Date: 2019/11/13
* Time: 2:17 下午
* Email: dong.xing@outlook.com
*/
import ViewConfig from './view/index.vue'
import Lines from './charts/Lines'
import Bar from './charts/Bar'
import Texts from './charts/Texts'
import Rects from './charts/Rects'
import Topology from './charts/Topology'
import CircleConfig from './charts/CircleConfig'
import TriangleConfig from './charts/TriangleConfig'
import ImageConfig from './charts/ImageConfig'

// 图表模板配置
const charts = {
  Bar,
  Lines,
  Texts,
  Rects,
  Topology,
  CircleConfig,
  TriangleConfig,
  ImageConfig
}

// 元素模板配置
const elements = {
}

// 模板配置组件
const CONFIGCOMPONENTS = {
  // 视图模板配置
  ViewConfig,
  ...charts,
  ...elements
}

export default CONFIGCOMPONENTS
