import {inject} from 'aurelia-framework';
import $ from 'utils';

@inject(Auth, LoginService)
class ResetFinish {
  constructor(auth, loginService) {
    this.auth = auth;
    this.loginService = loginService;

    this.login = LoginService.open;
    this.resetAccount = {};

    $.timeout(() => $.element('#password').focus());
  }

  activate(params, router) {
    this.params = params;

    this.keyMissing = $.isUndefined(params.key);
  }

  finishReset() {
    if (this.resetAccount.password !== this.confirmPassword) {
        this.doNotMatch = 'ERROR';
    } else {
        Auth.resetPasswordFinish({key: this.params.key, newPassword: this.resetAccount.password}).then(() => {
            this.success = 'OK';
        }).catch(() => {
            this.success = null;
            this.error = 'ERROR';
        });
    }
  }
}
