export function configure(config) {
  const resources = [
    './elements/language-switcher',
    './elements/has-any-authority',
    './elements/has-authority',
    './elements/page-ribbon',
    './elements/active-link'
  ];

  // active-menu element removed - use language-switcher instead!

  config.globalResources(resources);
}
