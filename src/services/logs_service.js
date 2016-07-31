import $ from 'utils';
import {inject} from 'aurelia-framework';
import {Resource} from '../resource';

@inject(Resource)
export default class LogsService {
  constructor(resource) {
    resource.fetch('management/jhipster/logs', {}, {
      'findAll': { method: 'GET', isArray: true},
      'changeLevel': { method: 'PUT'}
    }).then((response) => {
      console.log(response);
    });
  }
}
