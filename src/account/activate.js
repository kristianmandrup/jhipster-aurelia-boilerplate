import $ from 'util';

class Activate {
  constructor(Auth, LoginService) {
    Auth.activateAccount({key: $.params.key}).then(() => {
        this.error = null;
        this.success = 'OK';
    }).catch(function () {
        this.success = null;
        this.error = 'ERROR';
    });

    this.login = LoginService.open;
  }
}
