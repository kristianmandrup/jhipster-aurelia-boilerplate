import {inject} from 'aurelia-framework';
import {Resource} from '../resource';

@inject(Resource)

export default class MetricsService {
  constructor(resource) {
    this.resource = resource;
  }

  getMetrics () {
    return this.resource.fetch('management/jhipster/metrics').then((response) => {
      return response.data;
    });
  }

  threadDump () {
    return this.resource.fetch('management/dump').then((response) => {
      return response.data;
    });
  }
}
