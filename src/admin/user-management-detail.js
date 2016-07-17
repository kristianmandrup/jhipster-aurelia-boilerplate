// TODO: inject User
export default class UserManagementDetail {
  constructor($stateParams, User) {
    this.user = {};
    this.User = User;

    this.load($stateParams.login);
  }

  load (login) {
    User.get({login: login}, function(result) {
        vm.user = result;
    });
  }
}
