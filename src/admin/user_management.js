import {inject} from 'aurelia-framework';
import LanguageService from 'language_service';
import Principal from 'principal';
import User from 'user';
import ParseLinks from 'parse_links';

@inject(Principal, User, ParseLinks)
export default class UserManagement
  constructor(Principal, User, ParseLinks, LanguageService, $state, pagination) {
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


  setActive (user, isActivated) {
    user.activated = isActivated;
    User.update(user, () => {
      this.loadAll();
      this.clear();
    });
  }

  loadAll () {
    User.query({
      page: pagingParams.page - 1,
      size: this.itemsPerPage,
      sort: sort()
    }, onSuccess, onError);
  }

  onSuccess (data, headers) {
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

  onError (error) {
    AlertService.error(error.data.message);
  }

  clear () {
    this.user = {
      id: null, login: null, firstName: null, lastName: null, email: null,
      activated: null, langKey: null, createdBy: null, createdDate: null,
      lastModifiedBy: null, lastModifiedDate: null, resetDate: null,
      resetKey: null, authorities: null
    };
  }

  sort () {
    var result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
        result.push('id');
    }
    return result;
  }

  loadPage (page) {
    this.page = page;
    this.transition();
  }

  transition () {
    $state.transitionTo($state.$current, {
      page: this.page,
      sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
      search: this.currentSearch
    });
  }
}
