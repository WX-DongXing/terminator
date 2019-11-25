/**
* 折线图默认配置
* Author: dong xing
* Date: 2019/11/22
* Time: 4:49 下午
* Email: dong.xing@outlook.com
*/

const LinesConfig = {
  grid: [
    {
      show: true,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: 'transparent',
      borderColor: 'black',
      borderWidth: 1,
    },
    {
      show: true,
      top: 25,
      left: 25,
      bottom: 25,
      right: 25,
      borderWidth: 0,
      backgroundColor: 'transparent',
    },
  ],
  xAxis: [{
    gridIndex: 1,
  }],
  yAxis: [{
    gridIndex: 1,
  }],
};

export default LinesConfig;
