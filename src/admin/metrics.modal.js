import {inject} from 'aurelia-framework';

export default class MetricsMonitoringModal {
  constructor($uibModalInstance, threadDump) {
    this.cancel = cancel;
    this.getLabelClass = getLabelClass;
    this.threadDump = threadDump;
    this.threadDumpAll = 0;
    this.threadDumpBlocked = 0;
    this.threadDumpRunnable = 0;
    this.threadDumpTimedWaiting = 0;
    this.threadDumpWaiting = 0;

    $.forEach(threadDump, (value) => {
        if (value.threadState === 'RUNNABLE') {
            this.threadDumpRunnable += 1;
        } else if (value.threadState === 'WAITING') {
            this.threadDumpWaiting += 1;
        } else if (value.threadState === 'TIMED_WAITING') {
            this.threadDumpTimedWaiting += 1;
        } else if (value.threadState === 'BLOCKED') {
            this.threadDumpBlocked += 1;
        }
    });

    this.threadDumpAll = this.threadDumpRunnable + this.threadDumpWaiting +
        this.threadDumpTimedWaiting + this.threadDumpBlocked;
  }
  function cancel () {
      $uibModalInstance.dismiss('cancel');
  }

  function getLabelClass (threadState) {
      if (threadState === 'RUNNABLE') {
          return 'label-success';
      } else if (threadState === 'WAITING') {
          return 'label-info';
      } else if (threadState === 'TIMED_WAITING') {
          return 'label-warning';
      } else if (threadState === 'BLOCKED') {
          return 'label-danger';
      }
  }
}
