import JhiTrackerService from '../tracker-service';
import LocalStorage from '../local-storage';
import { HttpClient } from '../aurelia-fetch-client';

import defer from 'promise-defer';

@inject(HttpClient, LocalStorage, JhiTrackerService)
export default class AuthServerProvider extends Service {
  constructor(http, localStorage, jhiTrackerService) {
    this.http = http;
    this.localStorage = localStorage;
    this.jhiTrackerService = jhiTrackerService;
  }

  service() {
    return this;
  }

  getToken () {
    return this.localStorage.authenticationToken;
  }

  hasValidToken () {
    return !!this.getToken();
  }

  login (credentials) {
    var data = 'j_username=' + encodeURIComponent(credentials.username) +
        '&j_password=' + encodeURIComponent(credentials.password) +
        '&remember-me=' + credentials.rememberMe + '&submit=Login';

    return this.http.post('api/authentication', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).success(function (response) {
        return response;
    });
  }

  logout () {
    this.hiTrackerService.disconnect();

    // logout from the server
    this.http.post('api/logout').success(function (response) {
        delete this.localStorage.authenticationToken;
        // to get a new csrf token call the api
        this.http.get('api/account');
        return response;
    });
  }
}
