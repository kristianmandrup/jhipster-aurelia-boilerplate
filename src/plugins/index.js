import {I18N} from 'aurelia-i18n';
import XHR from 'i18next-xhr-backend';

export function configure(config) {
  config.plugin('aurelia-i18n', (instance) => {
    // register backend plugin
    instance.i18next.use(XHR);

    // adapt options to your needs (see http://i18next.com/docs/options/)
    instance.setup({
        backend: {                                  // <-- configure backend settings
        loadPath: '/i18n//.json', // <-- XHR settings for where to get the files from
        },
        lng : 'en',
        attributes : ['t','i18n'],
        fallbackLng : 'cy',
        debug : false
    });
}
