import {inject} from 'aurelia-framework';
import $ from 'utils';

@inject((Session, Principal))
class Sessions {
  constructor(session, principal) {
    this.account = null;
    this.error = null;
    this.invalidate = invalidate;
    this.sessions = this.session.getAll();
    this.success = null;

    this.principal.identity().then((account) =>
        this.account = account;
    );
  }

  invalidate(series) {
    this.session.delete({series: encodeURIComponent(series)},
        () => {
            this.error = null;
            this.success = 'OK';
            this.sessions = this.session.getAll();
        },
        () => {
            this.success = null;
            this.error = 'ERROR';
        });
  }
}
