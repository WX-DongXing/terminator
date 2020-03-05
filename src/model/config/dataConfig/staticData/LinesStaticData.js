/**
* 折线图静态数据
* Author: dong xing
* Date: 2019/11/22
* Time: 4:48 下午
* Email: dong.xing@outlook.com
*/
const LinesStaticData = {
  legend: {
    data: ['折线图示例']
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    { name: '折线图示例', data: [820, 932, 901, 934, 1290, 1330, 1320] }
  ]
}

export default LinesStaticData
