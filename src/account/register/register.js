import {inject} from 'aurelia-framework';
import $ from '../utils';

@inject(Auth, LoginService)
export default class Register {
  constructor(auth, loginService) {
    this.auth = auth;
    this.loginService = loginService;

    this.login = this.LoginService.open;
    this.registerAccount = {};

    $.timeout(() => $.element('#login').focus());
  }

  register () {
    if (this.registerAccount.password !== this.confirmPassword) {
        this.doNotMatch = 'ERROR';
    } else {
        this.registerAccount.langKey = $.translate.use();
        this.doNotMatch = null;
        this.error = null;
        this.errorUserExists = null;
        this.errorEmailExists = null;

        this.auth.createAccount(this.registerAccount).then(() => {
            this.success = 'OK';
        }).catch((response) => {
            this.success = null;
            if (response.status === 400 && response.data === 'login already in use') {
                this.errorUserExists = 'ERROR';
            } else if (response.status === 400 && response.data === 'e-mail address already in use') {
                this.errorEmailExists = 'ERROR';
            } else {
                this.error = 'ERROR';
            }
        });
    }
  }
}
