import {inject} from 'aurelia-framework';
import User from 'user';

@inject(User)
export default class UserManagementDeleteController {
  constructor(User, uibModalInstance, entity) {
    this.user = entity;
    this.clear = clear;
    this.confirmDelete = confirmDelete;
    this.uibModalInstance = uibModalInstance;
  }

  clear () {
    this.uibModalInstance.dismiss('cancel');
  }

  confirmDelete (login) {
    User.delete({login: login}, () => {
        this.uibModalInstance.close(true);
    });
  }
}
