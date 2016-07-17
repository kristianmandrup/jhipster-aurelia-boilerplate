class Sessions {
  constructor(Session, Principal) {
    this.account = null;
    this.error = null;
    this.invalidate = invalidate;
    this.sessions = Session.getAll();
    this.success = null;

    Principal.identity().then((account) =>
        this.account = account;
    );
  }

  invalidate(series) {
    var vm = this;
    Session.delete({series: encodeURIComponent(series)},
        function () {
            vm.error = null;
            vm.success = 'OK';
            vm.sessions = Session.getAll();
        },
        function () {
            vm.success = null;
            vm.error = 'ERROR';
        });
  }
}
