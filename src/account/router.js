export class AccountRouter {
  heading = 'Account Router';

  configureRouter(config, router){
    config.map([
      { route: 'activate',  name: 'activate', moduleId: './activate', nav: true, title: 'Activate' },
      { route: 'password',  name: 'password', moduleId: './password', nav: true, title: 'Password' },
      // { route: 'docs',  name: 'docs', moduleId: './docs', nav: true, title: 'Docs' }
      { route: 'register',  name: 'register', moduleId: './register', nav: true, title: 'Register' },
      { route: 'reset-finish',  name: 'reset-finish', moduleId: './reset-finish', nav: true, title: 'Reset finish' },
      { route: 'reset-request',  name: 'reset-request', moduleId: './reset-request', nav: true, title: 'Reset request' },
      { route: 'sessions',  name: 'sessions', moduleId: './sessions', nav: true, title: 'User Sessions' },
      { route: 'settings',  name: 'settings', moduleId: './settings', nav: true, title: 'User Settings' },
    ]);

    this.router = router;
  }
}
