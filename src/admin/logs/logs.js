import {inject} from 'aurelia-framework';
import LogsService from './logs-service';

@inject(LogsService)
export default class Logs {
  constructor(logsService) {
    this.loggers = logsService.findAll();
    this.logsService = logsService;
  }

  changeLevel (name, level) {
    LogsService.changeLevel({name: name, level: level}, () => {
        this.loggers = this.logsService.findAll();
    });
  }

  get traceBtn() {
    return this.logger.level == 'TRACE' ? 'danger' : 'default'
  }

  get debugBtn() {
    return this.logger.level == 'DEBUG' ? 'warning' : 'default'
  }

  get infoBtn() {
    return (logger.level=='INFO') ? 'info' : 'default';
  }

  get warnBtn() {
    return (logger.level=='WARN') ? 'success' : 'default'
  }

  get errorBtn() {
    return (logger.level=='ERROR') ? 'primary' : 'default';
  }
}
