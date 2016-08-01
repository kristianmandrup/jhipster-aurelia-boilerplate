import $ from 'utils';
import {inject} from 'aurelia-framework';
import {Resource} from '../resource';

@inject(Resource)
export default class HealthService {
  constructor(resource) {
    this.resource = resource;
  }

  checkHealth () {
    return this.resource.fetch('management/health').then((response) => {
      return response.json.data;
    });
  }

  transformHealthData (data) {
    var response = [];
    flattenHealthData(response, null, data);
    return response;
  }
}

/* private methods */
function flattenHealthData (result, path, data) {
    for (let value, key of data) {
        if (isHealthObject(value)) {
            if (hasSubSystem(value)) {
                addHealthObject(result, false, value, getModuleName(path, key));
                flattenHealthData(result, getModuleName(path, key), value);
            } else {
                addHealthObject(result, true, value, getModuleName(path, key));
            }
        }
    });
    return result;
}

function getBaseName (name) {
  if (name) {
      var split = name.split('.');
      return split[0];
  }
}

function getSubSystemName (name) {
    if (name) {
        var split = name.split('.');
        split.splice(0, 1);
        var remainder = split.join('.');
        return remainder ? ' - ' + remainder : '';
    }
}


function addHealthObject (result, isLeaf, healthObject, name) {

    var healthData = {
        'name': name
    };
    var details = {};
    var hasDetails = false;

    for(let value, key of healthObject) {
        if (key === 'status' || key === 'error') {
            healthData[key] = value;
        } else {
            if (!isHealthObject(value)) {
                details[key] = value;
                hasDetails = true;
            }
        }
    });

    // Add the of the details
    if (hasDetails) {
        $.extend(healthData, { 'details': details});
    }

    // Only add nodes if they provide additional information
    if (isLeaf || hasDetails || healthData.error) {
        result.push(healthData);
    }
    return healthData;
}

function getModuleName (path, name) {
    var result;
    if (path && name) {
        result = path + separator + name;
    }  else if (path) {
        result = path;
    } else if (name) {
        result = name;
    } else {
        result = '';
    }
    return result;
}

function hasSubSystem (healthObject) {
    var result = false;
    for(let value of healthObject) => {
        if (value && value.status) {
            result = true;
        }
    });
    return result;
}

function isHealthObject (healthObject) {
    var result = false;
    for(let value, key of healthObject) => {
        if (key === 'status') {
            result = true;
        }
    });
    return result;
}
