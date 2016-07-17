export default function LogsController (LogsService) {
    var vm = this;

    vm.changeLevel = changeLevel;
    vm.loggers = LogsService.findAll();

    return vm;

    function changeLevel (name, level) {
        LogsService.changeLevel({name: name, level: level}, function () {
            vm.loggers = LogsService.findAll();
        });
    }
}
