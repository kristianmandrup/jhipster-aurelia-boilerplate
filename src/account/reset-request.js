class ResetRequest {
  constructor($, Auth) {
    this.resetAccount = {};
    $.timeout(() => $.element('#email').focus(););
  }
  requestReset () {
    vm.error = null;
    vm.errorEmailNotExists = null;

    Auth.resetPasswordInit(this.resetAccount.email).then(() =>
      this.success = 'OK';
    ).catch((response) =>
        this.success = null;
        if (response.status === 400 && response.data === 'e-mail address not registered') {
            this.errorEmailNotExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }
    });
  }
}
