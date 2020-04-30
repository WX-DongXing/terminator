/**
* 饼图静态数据配置
* Date: 2020/4/27
* Time: 5:42 下午
*/

const defaultPieStaticData = {
  legend: {
    data: ['part-one', 'part-two', 'part-three']
  },
  series: [
    {
      name: 'Demo',
      type: 'pie',
      data: [
        { name: 'part-one', value: 100 },
        { name: 'part-two', value: 200 },
        { name: 'part-three', value: 300 }
      ]
    }
  ]
}

export default class PieStaticDataConfig {
  constructor ({
    staticData = defaultPieStaticData
  }) {
    this.staticData = staticData
  }

  /**
   * 获取折线图静态数据代码
   * @returns {string}
   */
  getCode () {
    return JSON.stringify(this.staticData, null, '\t')
  }

  /**
   * 更新静态数据
   * @param config
   * @param code
   */
  updateStaticData (config, code) {
    Object.assign(
      config.dataConfig.staticDataConfig,
      { staticData: JSON.parse(code) }
    )
  }
}
