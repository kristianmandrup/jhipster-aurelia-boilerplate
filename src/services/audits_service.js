import $ from 'utils';

export default class AuditsService {
  constructor() {
    this.resource = $.resource('management/jhipster/audits/:id', {}, {
      'get': {
          method: 'GET',
          isArray: true
      },
      'query': {
          method: 'GET',
          isArray: true,
          params: {fromDate: null, toDate: null}
      }
    });
  }
}
