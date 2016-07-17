export default function JhiHealthCheckController (JhiHealthService) {
    var vm = this;

    vm.updatingHealth = true;
    vm.getLabelClass = getLabelClass;
    vm.refresh = refresh;
    vm.showHealth = showHealth;
    vm.baseName = JhiHealthService.getBaseName;
    vm.subSystemName = JhiHealthService.getSubSystemName;

    vm.refresh();

    return vm;

    function getLabelClass (statusState) {
        if (statusState === 'UP') {
            return 'label-success';
        } else {
            return 'label-danger';
        }
    }

    function refresh () {
        vm.updatingHealth = true;
        JhiHealthService.checkHealth().then(function (response) {
            vm.healthData = JhiHealthService.transformHealthData(response);
            vm.updatingHealth = false;
        }, function (response) {
            vm.healthData =  JhiHealthService.transformHealthData(response.data);
            vm.updatingHealth = false;
        });
    }

}