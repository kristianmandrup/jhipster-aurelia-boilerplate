import $ from 'utils';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export default class MetricsService {
  constructor(http) {
    this.http = http;
  }

  getMetrics () {
    return http.get('management/jhipster/metrics').then((response) => {
      return response.data;
    });
  }

  threadDump () {
    return http.get('management/dump').then((response) => {
      return response.data;
    });
  }
}
