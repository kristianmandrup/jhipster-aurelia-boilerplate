export default class Configuration {
  constructor(ConfigurationService) {
    ConfigurationService.get().then((configuration) => {
      this.configuration = configuration;
    });
    ConfigurationService.getEnv().then((configuration) => {
        this.allConfiguration = configuration;
    });
  }
}
