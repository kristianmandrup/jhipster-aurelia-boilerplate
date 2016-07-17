import $ from 'utils';

export default class LogsService {
  constructor() {
    this.resource = $.resource('management/jhipster/logs', {}, {
      'findAll': { method: 'GET', isArray: true},
      'changeLevel': { method: 'PUT'}
    });
  }
}
