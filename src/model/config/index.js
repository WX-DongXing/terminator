import Factory from '../factory/factory';
import CommonConfig from './commonConfig';
import DataConfig from './dataConfig';

// 图表专有属性工厂
const chartProprietaryConfigFactory = Factory.createChartProprietaryConfigFactory();

class Config {
  constructor({
    commonConfig, proprietaryConfig, dataConfig,
  }) {
    this.commonConfig = new CommonConfig(commonConfig);
    this.proprietaryConfig = chartProprietaryConfigFactory.create({
      type: commonConfig.type,
      proprietaryConfig,
    });
    this.dataConfig = new DataConfig({
      widgetType: commonConfig.type,
      ...dataConfig,
    });
  }
}

export default Config;
