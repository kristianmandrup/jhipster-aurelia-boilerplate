import {inject} from 'aurelia-framework';
import $ from 'util';

@inject(Auth, LoginService)
class Activate {
  constructor(auth, loginService) {
    this.auth = auth;
    this.loginService = loginService;

    this.auth.activateAccount({key: $.params.key}).then(() => {
        this.error = null;
        this.success = 'OK';
    }).catch(function () {
        this.success = null;
        this.error = 'ERROR';
    });

    this.login = this.loginService.open;
  }
}
