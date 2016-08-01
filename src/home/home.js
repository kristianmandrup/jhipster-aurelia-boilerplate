import Principal from '../services/auth/principal';
import LoginService from '../services/login-service';

@inject(Principal, LoginService)
class Home(Principal, LoginService) {
  constructor() {
    this.account = null;
    this.isAuthenticated = null;
    this.login = LoginService.open;
    this.register = register;
  }

  activated()
    this.getAccount();
  })

  getAccount() {
    principal.identity().then((account) => {
        this.account = account;
        this.isAuthenticated = Principal.isAuthenticated;
    });
  }
}
