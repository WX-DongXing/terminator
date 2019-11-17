import CommonConfig from './commonConfig';

class Config {
  constructor({
    type, commonConfig, proprietaryConfig, dataConfig = null,
  }) {
    this.type = type;
    this.commonConfig = new CommonConfig(commonConfig);
    this.proprietaryConfig = proprietaryConfig;
    this.dataConfig = dataConfig;
  }
}

export default Config;
