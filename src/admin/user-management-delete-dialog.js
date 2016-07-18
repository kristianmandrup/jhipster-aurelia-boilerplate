import {inject} from 'aurelia-framework';
import User from 'user';

@inject(User)
export default class UserManagementDeleteController {
  constructor(User, $uibModalInstance, entity) {
    this.user = entity;
    this.clear = clear;
    this.confirmDelete = confirmDelete;
  }

  clear () {
    $uibModalInstance.dismiss('cancel');
  }

  confirmDelete (login) {
    User.delete({login: login}, () => {
        $uibModalInstance.close(true);
    });
  }
}
