import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

// See https://auth0.com/blog/creating-your-first-aurelia-app-from-authentication-to-calling-an-api/
@inject(Router, Auth, LoginService)
class Activate {
  constructor(router, auth, loginService) {
    this.auth = auth;
    this.loginService = loginService;
  }

  activate(params, routeConfig) {
    this.auth.activateAccount({key: params.key}).then(() => {
        this.error = null;
        this.success = 'OK';
    }).catch(function () {
        this.success = null;
        this.error = 'ERROR';
    });

    this.login = this.loginService.open;
  }
}
