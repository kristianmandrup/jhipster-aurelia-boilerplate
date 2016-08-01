export default class HealthModal {
  constructor(modalInstance, currentHealth, baseName, subSystemName) {
    this.currentHealth = currentHealth;
    this.baseName = baseName;
    this.subSystemName = subSystemName;
    this.modalInstance = modalInstance;
  }

  cancel() {
    this.modalInstance.dismiss('cancel');
  }
}
