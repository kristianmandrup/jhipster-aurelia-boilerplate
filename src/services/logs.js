export default function LogsService ($) {
    var service = $.resource('management/jhipster/logs', {}, {
        'findAll': { method: 'GET', isArray: true},
        'changeLevel': { method: 'PUT'}
    });

    return service;
}
