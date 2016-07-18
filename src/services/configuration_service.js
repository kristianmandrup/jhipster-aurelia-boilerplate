import $ from 'utils';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export default class ConfigurationService {
  constructor(http) {
    this.http = http;
  }

  get () {
    return this.http.get('management/configprops').then(getConfigPropsComplete);
  }

  getEnv () {
    return this.http.get('management/env').then(getEnvComplete);
  }
}

function getConfigPropsComplete (response) {
    var properties = [];
    for (let data of response.data) {
        properties.push(data);
    );
    var orderBy = $.filter('orderBy');
    return orderBy(properties, 'prefix');
}

function getEnvComplete (response) {
    var properties = {};
    for (let val,key of response.data) {
      var vals = [];
      for( let v,k of val) {
        vals.push({ key:k, val:v });
      });
      properties[key] = vals;
    });
    return properties;
}
