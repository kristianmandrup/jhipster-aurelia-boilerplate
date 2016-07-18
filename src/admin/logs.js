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
}
