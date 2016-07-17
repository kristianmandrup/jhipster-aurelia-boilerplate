export default function JhiConfigurationController (JhiConfigurationService) {
    var vm = this;

    vm.allConfiguration = null;
    vm.configuration = null;

    return vm;

    JhiConfigurationService.get().then(function(configuration) {
        vm.configuration = configuration;
    });
    JhiConfigurationService.getEnv().then(function (configuration) {
        vm.allConfiguration = configuration;
    });
}
