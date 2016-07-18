import {inject} from 'aurelia-framework';
import $ from 'utils';
import Principal from 'principal';
import Auth from 'auth';
import LanguageService from 'language_service';

@inject(Principal, Auth, LanguageService)
class Settings {
  constructor(principal, auth, languageService) {
    this.principal = principal;
    this.auth = auth;
    this.languageService = languageService;

    this.error = null;
    this.settingsAccount = null;
    this.success = null;

    this.principal.identity().then(account =>
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
    this.auth.updateAccount(this.settingsAccount).then(() =>
        this.error = null;
        this.success = 'OK';
        this.principal.identity(true).then((account) =>
            this.settingsAccount = copyAccount(account);
        );
        this.languageService.getCurrent().then((current) =>
            if (vm.settingsAccount.langKey !== current) {
                $.translate.use(this.settingsAccount.langKey);
            }
        );
    ).catch(() => {
        this.success = null;
        this.error = 'ERROR';
    });
  }
}
