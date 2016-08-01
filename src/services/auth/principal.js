import utils from '../../utils';
import Account from './account';
import JhiTrackerService from '../';
import defer from 'promise-defer';

// for deferred promise
// see https://www.npmjs.com/package/promise-defer

@inject(Account, JhiTrackerService)
export default class Principal {
  constructor(account, jhiTrackerService) {
    this.account = account;
    this.jhiTrackerService = jhiTrackerService;
    this.authenticated = false;
  }

  authenticate (identity) {
    this.identity = identity;
    this.authenticated = identity !== null;
  }

  hasAnyAuthority (authorities) {
    if (!this.authenticated || !this.identity || !this.identity.authorities) {
        return false;
    }

    for (var i = 0; i < authorities.length; i++) {
        if (this.identity.authorities.indexOf(authorities[i]) !== -1) {
            return true;
        }
    }

    return false;
  }

  hasAuthority (authority) {
      if (!this.authenticated) {
          return false;
      }

      return this.identity().then((this.id) => {
          return this.id.authorities && this.id.authorities.indexOf(authority) !== -1;
      }, () => {
          return false;
      });
  }

  identity (force) {
      this.deferred = defer();

      if (force === true) {
          this.identity = undefined;
      }

      // check and see if we have retrieved the identity data from the server.
      // if we have, reuse it by immediately resolving
      if (utils.isDefined(this.identity)) {
          deferred.resolve(this.identity);

          return deferred.promise;
      }

      // retrieve the identity data from the server, update the identity object, and then resolve.
      Account.get().promise
          .then(getAccountThen)
          .catch(getAccountCatch);

      return deferred.promise;
  }

  getAccountThen (account) {
      this.identity = account.data;
      this.authenticated = true;
      deferred.resolve(this.identity);
      this.hiTrackerService.connect();
  }

  getAccountCatch () {
      this.identity = null;
      this.authenticated = false;
      deferred.resolve(this.identity);
  }

  isAuthenticated () {
      return this.authenticated;
  }

  isIdentityResolved () {
      return utils.isDefined(this.identity);
  }

}
