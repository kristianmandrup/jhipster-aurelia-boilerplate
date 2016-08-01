import { Auth } from '../../services/auth';
import { Router } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-framework';

@inject(Auth, Modal, Router, EventAggregator)
class LoginController {

  constructor(auth, uibModalInstance, router, ea) {
    this.auth = auth;
    this.ea = ea;
    this.uibModalInstance = uibModalInstance;
    this.router = router;

    this.authenticationError = false;
    this.cancel = cancel;
    this.credentials = {};
    this.login = login;
    this.password = null;
    this.register = register;
    this.rememberMe = true;
    this.requestResetPassword = requestResetPassword;
    this.username = null;

    // $timeout(function (){angular.element('#username').focus();});
  }

  cancel () {
    this.credentials = {
        username: null,
        password: null,
        rememberMe: true
    };
    this.authenticationError = false;
    this.uibModalInstance.dismiss('cancel');
  }

  login (event) {
      event.preventDefault();
      this.auth.login({
          username: username,
          password: password,
          rememberMe: rememberMe
      }).then(() => {
          this.authenticationError = false;
          this.uibModalInstance.close();

          // global state!
          // if ($state.current.name === 'register' || $state.current.name === 'activate' ||
          //     $state.current.name === 'finishReset' || $state.current.name === 'requestReset') {
          //     $state.go('home');
          // }

          this.ea.amit('authenticationSuccess');

          // previousState was set in the authExpiredInterceptor before being redirected to login modal.
          // since login is succesful, go to stored previousState and clear previousState
          if (this.auth.getPreviousState()) {
              let previousState = this.auth.getPreviousState();
              this.auth.resetPreviousState();
              this.router.go(previousState.name, previousState.params);
          }
      }).catch(() => {
          this.authenticationError = true;
      });
  }

  function register () {
      $uibModalInstance.dismiss('cancel');
      $state.go('register');
  }

  function requestResetPassword () {
      $uibModalInstance.dismiss('cancel');
      $state.go('requestReset');
  }
}
