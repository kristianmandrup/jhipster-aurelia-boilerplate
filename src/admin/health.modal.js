export default class HealthModal {
  constructor($uibModalInstance, currentHealth, baseName, subSystemName) {
    this.currentHealth = currentHealth;
    this.baseName = baseName;
    this.subSystemName = subSystemName;
    this.$uibModalInstance = $uibModalInstance;
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }
}
