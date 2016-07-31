import $ from 'utils';
import {inject} from 'aurelia-framework';
import {Resource} from '../resource';
import 'fetch';

// TODO: add resource method
@inject(Resource)
export default class AuditsService {
  constructor(resource) {
    resource.fetch('management/jhipster/audits/:id', {}, {
      'get': {
          method: 'GET',
          isArray: true
      },
      'query': {
          method: 'GET',
          isArray: true,
          params: {fromDate: null, toDate: null}
      }
    }).then((response) => {
      console.log(response.json);
    });
  }
}
