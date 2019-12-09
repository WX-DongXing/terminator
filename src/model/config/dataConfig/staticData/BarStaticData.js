/**
* 柱形图静态数据
* Author: dong xing
* Date: 2019/11/26
* Time: 2:24 下午
* Email: dong.xing@outlook.com
*/

const BarStaticData = {
  legend: {
    show: false
  },
  xAxis: {
    type: 'category',
    data: ['Forest', 'Steppe', 'Desert', 'Wetland']
  },
  yAxis: {
    type: 'value'
  },
  singleSeries: [
    {
      name: 'Forest',
      type: 'bar',
      stack: 'stack',
      data: [320, 0, 0, 0]
    },
    {
      name: 'Steppe',
      type: 'bar',
      stack: 'stack',
      data: [0, 182, 0, 0]
    },
    {
      name: 'Desert',
      type: 'bar',
      stack: 'stack',
      data: [0, 0, 201, 0]
    },
    {
      name: 'Wetland',
      type: 'bar',
      stack: 'stack',
      data: [0, 0, 0, 400]
    }
  ],
  multipleSeries: [
    {
      name: 'Forest',
      type: 'bar',
      stack: null,
      data: [320, 332, 301, 334, 390]
    },
    {
      name: 'Steppe',
      type: 'bar',
      stack: null,
      data: [220, 182, 191, 234, 290]
    },
    {
      name: 'Desert',
      type: 'bar',
      stack: null,
      data: [150, 232, 201, 154, 190]
    },
    {
      name: 'Wetland',
      type: 'bar',
      stack: null,
      data: [98, 77, 101, 99, 40]
    }
  ]
}

export default BarStaticData
