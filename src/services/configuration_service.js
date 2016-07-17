import $ from 'utils';

export default class ConfigurationService {
  get () {
    return $.http.get('management/configprops').then(getConfigPropsComplete);
  }

  getEnv () {
    return $.http.get('management/env').then(getEnvComplete);
  }
}

function getConfigPropsComplete (response) {
    var properties = [];
    $.forEach(response.data, function (data) {
        properties.push(data);
    });
    var orderBy = $.filter('orderBy');
    return orderBy(properties, 'prefix');
}

function getEnvComplete (response) {
    var properties = {};
    $.forEach(response.data, function (val,key) {
        var vals = [];
        angular.forEach(val, function (v,k) {
            vals.push({ key:k, val:v });
        });
        properties[key] = vals;
    });
    return properties;
}
