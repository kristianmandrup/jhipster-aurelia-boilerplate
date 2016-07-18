import {inject} from 'aurelia-framework';

@inject(Auth, Principal)
class Password {
  constructor(auth, principal) {
    this.auth = auth;
    this.principal = principal;
    this.principal.identity().then((account) => {
        this.account = account;
    });
  }

  changePassword () {
    if (this.password !== this.confirmPassword) {
        this.error = null;
        this.success = null;
        this.doNotMatch = 'ERROR';
    } else {
        this.doNotMatch = null;
        this.auth.changePassword(this.password).then(() => {
            this.error = null;
            this.success = 'OK';
        }).catch(() => {
            this.success = null;
            this.error = 'ERROR';
        });
    }
  }
}
