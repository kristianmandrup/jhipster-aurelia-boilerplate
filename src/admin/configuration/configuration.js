import {inject} from 'aurelia-framework';
import ConfigurationService from './configuration-service';

@inject(ConfigurationService)

export default class Configuration {
  constructor(configurationService) {
    this.ConfigurationService = ConfigurationService;

    this.configurationService.get().then((configuration) => {
      this.configuration = configuration;
    });

    this.configurationService.getEnv().then((configuration) => {
        this.allConfiguration = configuration;
    });
  }
}
