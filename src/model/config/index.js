import CommonConfig from './commonConfig';
import factory from '../factory/factory';

// 图表专有属性工厂
const chartProprietaryConfigFactory = factory.createChartProprietaryConfigFactory();

class Config {
  constructor({
    commonConfig, proprietaryConfig, dataConfig = null,
  }) {
    this.commonConfig = new CommonConfig(commonConfig);
    this.proprietaryConfig = chartProprietaryConfigFactory.create({
      type: commonConfig.type,
      proprietaryConfig,
    });
    this.dataConfig = dataConfig;
  }
}

export default Config;
