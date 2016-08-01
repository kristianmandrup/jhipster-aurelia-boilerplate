import { Modal } from 'aurelia-dialog'

@inject(Modal)
class LoginService {
  constructor(uibModal) {
    this.uibModal = uibModal;
    this.modalInstance = null;
  }

  resetModal() {
    this.modalInstance = null;
  }

  open () {
    if (modalInstance !== null) return;

    modalInstance = this.uibModal.open('login.html');
    modalInstance.result.then(
        resetModal,
        resetModal
    );
  }
}
