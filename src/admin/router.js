export class AdminRouter {
  configureRouter(config, router){
    config.map([
      { route: 'audits',  name: 'audits', moduleId: './audits', nav: true, title: 'Audits' },
      { route: 'configuration',  name: 'configuration', moduleId: './configuration', nav: true, title: 'Configuration' },
      // { route: 'docs',  name: 'docs', moduleId: './docs', nav: true, title: 'Docs' }
      { route: 'health',  name: 'health', moduleId: './health', nav: true, title: 'Health' },
      { route: 'logs',  name: 'logs', moduleId: './logs', nav: true, title: 'Logs' },
      { route: 'metrics',  name: 'metrics', moduleId: './metrics', nav: true, title: 'Metrics' },
      { route: 'user_management',  name: 'user_management', moduleId: './user_management', nav: true, title: 'User Management' },
    ]);

    this.router = router;
  }
}
