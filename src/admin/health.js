import {inject} from 'aurelia-framework';
import HealthService from '../services/health_service';

@inject(HealthService)
export default class Health {
  constructor(healthService) {
    this.healthService = healthService;
    this.updatingHealth = true;
    this.baseName = this.healthService.getBaseName;
    this.subSystemName = this.healthService.getSubSystemName;
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
    this.healthService.checkHealth().then((response) => {
        this.healthData = this.healthService.transformHealthData(response);
        this.updatingHealth = false;
    }, (response) => {
        this.healthData =  this.healthService.transformHealthData(response.data);
        this.updatingHealth = false;
    });
  }
}
