import $ from 'utils';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

// TODO: add resource method
@inject(HttpClient)
export default class LogsService {
  constructor() {
    this.resource = $.resource('management/jhipster/logs', {}, {
      'findAll': { method: 'GET', isArray: true},
      'changeLevel': { method: 'PUT'}
    });
  }
}
