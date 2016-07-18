import LogsService from '../services/logs_service';

export default class Logs {
  constructor(LogsService) {
    this.loggers = LogsService.findAll();
  }

  changeLevel (name, level) {
    LogsService.changeLevel({name: name, level: level}, () => {
        this.loggers = LogsService.findAll();
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
