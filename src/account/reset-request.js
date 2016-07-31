import {inject} from 'aurelia-framework';
import $ from 'utils';

@inject(Auth)
class ResetRequest {
  constructor(Auth) {
    this.resetAccount = {};
    $.timeout(() => $.element('#email').focus());
  }
  requestReset () {
    this.error = null;
    this.errorEmailNotExists = null;

    this.Auth.resetPasswordInit(this.resetAccount.email).then(() => {
      this.success = 'OK';
    }).catch((response) => {
        this.success = null;
        if (response.status === 400 && response.data === 'e-mail address not registered') {
            this.errorEmailNotExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }
    });
  }
}
