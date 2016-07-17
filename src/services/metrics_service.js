import $ from 'utils';

export default class MetricsService {
  getMetrics () {
    return $.http.get('management/jhipster/metrics').then((response) => {
      return response.data;
    });
  }

  threadDump () {
    return $.http.get('management/dump').then((response) => {
      return response.data;
    });
  }
}
