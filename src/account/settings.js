class Settings {
  constructor(Principal, Auth, JhiLanguageService) {
    this.error = null;
    this.settingsAccount = null;
    this.success = null;

    Principal.identity().then(account =>
      this.settingsAccount = copyAccount(account)
    );
  }

  /**
   * Store the "settings account" in a separate variable, and not in the shared "account" variable.
   */
  copyAccount(account) {
      return {
          activated: account.activated,
          email: account.email,
          firstName: account.firstName,
          langKey: account.langKey,
          lastName: account.lastName,
          login: account.login
      };
  }

  save() {
    Auth.updateAccount(this.settingsAccount).then(() =>
        this.error = null;
        this.success = 'OK';
        Principal.identity(true).then((account) =>
            this.settingsAccount = copyAccount(account);
        );
        JhiLanguageService.getCurrent().then((current) =>
            if (vm.settingsAccount.langKey !== current) {
                $.translate.use(this.settingsAccount.langKey);
            }
        );
    ).catch(function() {
        this.success = null;
        this.error = 'ERROR';
    });
  }
}
