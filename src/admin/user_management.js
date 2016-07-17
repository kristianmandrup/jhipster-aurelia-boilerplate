export default class UserManagement
  constructor(Principal, User, ParseLinks, $state, pagingParams, paginationConstants, LanguageService) {
    this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    this.currentAccount = null;
    this.languages = null;
    this.loadAll = loadAll;
    this.setActive = setActive;
    this.users = [];
    this.page = 1;
    this.totalItems = null;
    this.clear = clear;
    this.links = null;
    this.loadPage = loadPage;
    this.predicate = pagingParams.predicate;
    this.reverse = pagingParams.ascending;
    this.itemsPerPage = paginationConstants.itemsPerPage;
    this.transition = transition;

    this.loadAll();

    LanguageService.getAll().then((languages) => {
      this.languages = languages;
    });
    Principal.identity().then((account) => {
      this.currentAccount = account;
    });

  }


  function setActive (user, isActivated) {
    user.activated = isActivated;
    User.update(user, () => {
      this.loadAll();
      this.clear();
    });
  }

  function loadAll () {
    User.query({
      page: pagingParams.page - 1,
      size: this.itemsPerPage,
      sort: sort()
    }, onSuccess, onError);
  }

  function onSuccess (data, headers) {
    //hide anonymous user from user management: it's a required user for Spring Security
    for (var i in data) {
      if (data[i]['login'] === 'anonymoususer') {
        data.splice(i, 1);
      }
    }
    this.links = ParseLinks.parse(headers('link'));
    this.totalItems = headers('X-Total-Count');
    this.queryCount = this.totalItems;
    this.page = pagingParams.page;
    this.users = data;
  }

  function onError (error) {
    AlertService.error(error.data.message);
  }

  function clear () {
    this.user = {
      id: null, login: null, firstName: null, lastName: null, email: null,
      activated: null, langKey: null, createdBy: null, createdDate: null,
      lastModifiedBy: null, lastModifiedDate: null, resetDate: null,
      resetKey: null, authorities: null
    };
  }

  function sort () {
    var result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
        result.push('id');
    }
    return result;
  }

  function loadPage (page) {
    this.page = page;
    this.transition();
  }

  function transition () {
    $state.transitionTo($state.$current, {
      page: this.page,
      sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
      search: this.currentSearch
    });
  }
}
