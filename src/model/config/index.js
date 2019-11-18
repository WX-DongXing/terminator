import CommonConfig from './commonConfig';

class Config {
  constructor({
    commonConfig, proprietaryConfig, dataConfig = null,
  }) {
    this.commonConfig = new CommonConfig(commonConfig);
    this.proprietaryConfig = proprietaryConfig;
    this.dataConfig = dataConfig;
  }
}

export default Config;
