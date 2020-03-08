/**
* 图表配置
* Author: dong xing
* Date: 2020/1/13
* Time: 2:55 下午
* Email: dong.xing@outlook.com
*/

import Template from '@/model/template'

// 图表模板
const charts = [
  {
    category: 'CHART', type: 'Lines', name: '折线图', icon: 'line-chart', width: 300, height: 300
  },
  {
    category: 'CHART', type: 'Bar', name: '柱形图', icon: 'bar-chart', width: 300, height: 300
  },
  {
    category: 'CHART', type: 'Pie', name: '饼图', icon: 'pie-chart', width: 300, height: 300
  },
  {
    category: 'CHART', type: 'Area', name: '区域图', icon: 'area-chart', width: 300, height: 300
  },
  {
    category: 'CHART', type: 'Topology', name: '拓扑图', icon: 'branches', width: 800, height: 600
  }
]

// 元素模板
const elements = [
  {
    category: 'ELEMENT', type: 'text', name: '文本', icon: 'font-colors', width: 300, height: 200
  }
]

// 可拓展模板
const TEMPLATES = [
  ...charts.map(chart => new Template(chart)),
  ...elements.map(element => new Template(element))
]

export default TEMPLATES
