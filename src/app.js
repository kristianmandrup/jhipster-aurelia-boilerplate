export class App {
  constructor() {
    this.message = 'Hello World!';
  }

  configureRouter(config, router) {
     config.title = 'jHipster';
     config.map([
       { route: ['','welcome'], name: 'welcome', moduleId: './welcome', nav: true, title: 'Welcome'},
       { route: ['','admin'], name: 'admin', moduleId: './admin/router', nav: true,
       title: 'Admin'},
       { route: ['','account'], name: 'account', moduleId: './account/router', nav: true,
       title: 'Account'},
     ]);
     this.router = router;
   }
}
