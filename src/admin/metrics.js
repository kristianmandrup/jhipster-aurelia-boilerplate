import {inject} from 'aurelia-framework';
import MetricsService from '../services/metrics_service';

@inject(MetricsService)
export default class MetricsMonitoring {
  constructor(MetricsService, $uibModal) {
    this.cachesStats = {};
    this.metrics = {};
    this.servicesStats = {};
    this.updatingMetrics = true;
    this.refresh();
  }

  onMetricsChanged(newValue) {
    this.servicesStats = {};
    this.cachesStats = {};
    $.forEach(newValue.timers, (value, key) => {
      if (key.indexOf('web.rest') !== -1 || key.indexOf('service') !== -1) {
        this.servicesStats[key] = value;
      }
      if (key.indexOf('net.sf.ehcache.Cache') !== -1) {
          // remove gets or puts
          var index = key.lastIndexOf('.');
          var newKey = key.substr(0, index);

          // Keep the name of the domain
          index = newKey.lastIndexOf('.');
          this.cachesStats[newKey] = {
              'name': newKey.substr(index + 1),
              'value': value
          };
      }
    });
  };

  refresh () {
    this.updatingMetrics = true;
    MetricsService.getMetrics().then((promise) => {
        this.metrics = promise;
        this.updatingMetrics = false;
    }, (promise) => {
        this.metrics = promise.data;
        this.updatingMetrics = false;
    });
  }

  refreshThreadDumpData () {
    MetricsService.threadDump().then((data) => {
      $uibModal.open({
        templateUrl: 'app/admin/metrics/metrics.modal.html',
        controller: 'JhiMetricsMonitoringModalController',
        controllerAs: 'vm',
        size: 'lg',
        resolve: {
          threadDump: () => {
              return data;
          }
        }
      });
    });
  }
}
