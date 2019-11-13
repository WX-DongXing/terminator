import CommonConfig from './commonConfig';

class Config {
  constructor({
    type, container, commonConfig, proprietaryConfig,
    data,
  }) {
    this.type = type;
    this.container = container;
    this.commonConfig = new CommonConfig(commonConfig);
    this.proprietaryConfig = proprietaryConfig;
    this.data = data;
  }
}

export default Config;
