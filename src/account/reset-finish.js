import {inject} from 'aurelia-framework';
import $ from 'utils';

@inject(Auth, LoginService)
class ResetFinish {
  constructor(auth, loginService) {
    this.auth = auth;
    this.loginService = loginService;

    this.keyMissing = $.isUndefined($.params.key);
    this.login = LoginService.open;
    this.resetAccount = {};

    $.timeout(() => $.element('#password').focus());
  }

  finishReset() {
    if (this.resetAccount.password !== this.confirmPassword) {
        this.doNotMatch = 'ERROR';
    } else {
        Auth.resetPasswordFinish({key: $.params.key, newPassword: this.resetAccount.password}).then(() => {
            this.success = 'OK';
        }).catch(() => {
            this.success = null;
            this.error = 'ERROR';
        });
    }
  }
}
