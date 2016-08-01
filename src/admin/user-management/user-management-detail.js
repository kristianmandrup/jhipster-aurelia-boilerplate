import {inject} from 'aurelia-framework';
import User from 'user';

@inject(User)
export default class UserManagementDetail {
  constructor(User, stateParams) {
    this.user = {};
    this.User = User;

    this.load(stateParams.login);
  }

  load (login) {
    User.get({login: login}, function(result) {
        vm.user = result;
    });
  }
}
