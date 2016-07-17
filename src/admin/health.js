export default class Health {
  constructor(HealthService) {
    this.updatingHealth = true;
    this.baseName = HealthService.getBaseName;
    this.subSystemName = HealthService.getSubSystemName;
    this.refresh();
  }

  getLabelClass (statusState) {
    if (statusState === 'UP') {
        return 'label-success';
    } else {
        return 'label-danger';
    }
  }

  refresh () {
    this.updatingHealth = true;
    HealthService.checkHealth().then(function (response) {
        this.healthData = HealthService.transformHealthData(response);
        this.updatingHealth = false;
    }, function (response) {
        this.healthData =  HealthService.transformHealthData(response.data);
        this.updatingHealth = false;
    });
  }
}
