import { Router } from 'aurelia-framework';
import { Auth, Principal } from '../../services/auth';
import ProfileService from '../../services/profiles/profiles.service';

import LoginService from '../components/login/LoginService';

@inject(Auth, Principal, ProfileService, LoginService, Router)
class Navbar {
  constructor(auth, principal, profileService, loginService, router) {
    this.router = router;
    this.auth = auth;
    this.principal = principal;
    this.profileService = profileService;
    this.loginService = loginService;

    isNavbarCollapsed = true;
    isAuthenticated = Principal.isAuthenticated;

    ProfileService.getProfileInfo().then((response) => {
        this.inProduction = response.inProduction;
        this.swaggerEnabled = response.swaggerEnabled;
    });
  }

  login() {
      collapseNavbar();
      LoginService.open();
  }

  logout() {
      this.collapseNavbar();
      this.auth.logout();
      router.go('home');
  }

  toggleNavbar() {
      this.isNavbarCollapsed = !isNavbarCollapsed;
  }

  collapseNavbar() {
      isNavbarCollapsed = true;
  }
}
