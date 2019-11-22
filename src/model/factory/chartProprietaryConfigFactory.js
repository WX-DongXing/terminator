/**
* 图表专有属性配置工厂
* Author: dong xing
* Date: 2019/11/19
* Time: 5:37 下午
* Email: dong.xing@outlook.com
*/
import LinesProprietaryConfig from '../config/proprietaryConfigs/linesProprietaryConfig';

export default class ChartProprietaryConfigFactory {
  static create({ type, proprietaryConfig }) {
    switch (type) {
      case 'Lines':
        return new LinesProprietaryConfig(proprietaryConfig);
      default:
        return null;
    }
  }
}
