import {inject} from 'aurelia-framework';
import {Resource} from '../resource';

@inject(Resource)
export default class ConfigurationService {
  constructor(resource) {
    this.resource = resource;
  }

  retrieve() {
    return this.http.fetch('management/configprops').then(this.getConfigPropsComplete);
  }

  getEnv () {
    return this.http.fetch('management/env').then(this.getEnvComplete);
  }
}

function getConfigPropsComplete (response) {
    let properties = [];
    let data = response.json.data;
    for (let prop of data) {
        properties.push(prop);
    }
    // TODO: filter and sort
    return properties;
}

function getEnvComplete (response) {
    var properties = {};
    for (let val,key of response.data) {
      var vals = [];
      for( let v,k of val) {
        vals.push({ key:k, val:v });
      };
      properties[key] = vals;
    };
    return properties;
}
