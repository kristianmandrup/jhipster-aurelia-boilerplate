// TODO: inject
// Auth
// LoginService

class Password {

  constructor(Auth, Principal) {
    Principal.identity().then((account) => {
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
        Auth.changePassword(this.password).then(function () {
            this.error = null;
            this.success = 'OK';
        }).catch(function () {
            this.success = null;
            this.error = 'ERROR';
        });
    }
  }
}
