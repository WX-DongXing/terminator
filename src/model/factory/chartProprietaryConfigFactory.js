/**
* 图表专有属性配置工厂
* Author: dong xing
* Date: 2019/11/19
* Time: 5:37 下午
* Email: dong.xing@outlook.com
*/
import LinesProprietaryConfig from '../config/proprietaryConfigs/LinesProprietaryConfig'
import BarProprietaryConfig from '../config/proprietaryConfigs/BarProprietaryConfig'
import TopologyProprietaryConfig from '../config/proprietaryConfigs/TopologyProprietaryConfig'
import TextsProprietaryConfig from '../config/proprietaryConfigs/TextsProprietaryConfig'
import ViewProprietaryConfig from '../config/proprietaryConfigs/ViewProprietaryConfig'
import RectProprietaryConfig from '../config/proprietaryConfigs/RectProprietaryConfig'
import CircleProprietaryConfig from '../config/proprietaryConfigs/CircleProprietaryConfig'
import TriangleChartProprietaryConfig from '../config/proprietaryConfigs/TriangleProprietaryConfig'
import ImageProprietaryConfig from '../config/proprietaryConfigs/ImageProprietaryConfig'
import DateTimeProprietaryConfig from '../config/proprietaryConfigs/DateTimeProprietaryConfig'

export default class ChartProprietaryConfigFactory {
  static create ({ type, proprietaryConfig = {} }) {
    switch (type) {
      case 'Lines':
        return new LinesProprietaryConfig(proprietaryConfig)
      case 'Bar':
        return new BarProprietaryConfig(proprietaryConfig)
      case 'Topology':
        return new TopologyProprietaryConfig(proprietaryConfig)
      case 'Texts':
        return new TextsProprietaryConfig(proprietaryConfig)
      case 'Rect':
        return new RectProprietaryConfig(proprietaryConfig)
      case 'Circle':
        return new CircleProprietaryConfig(proprietaryConfig)
      case 'Triangle':
        return new TriangleChartProprietaryConfig(proprietaryConfig)
      case 'Image':
        return new ImageProprietaryConfig(proprietaryConfig)
      case 'DateTime':
        return new DateTimeProprietaryConfig(proprietaryConfig)
      case 'View':
        return new ViewProprietaryConfig(proprietaryConfig)
      default:
        return null
    }
  }
}
