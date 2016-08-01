import utils from '../../utils';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export default class ProfileService {
  constructor(http) {
    this.http = http;
  }

  getProfileInfo() {
    if (utils.isUndefined(dataPromise)) {
        dataPromise = this.http.get('api/profile-info').then((result) => {
            if (result.data.activeProfiles) {
                var response = {};
                response.activeProfiles = result.data.activeProfiles;
                response.ribbonEnv = result.data.ribbonEnv;
                response.inProduction = result.data.activeProfiles.indexOf("prod") !== -1;
                response.swaggerDisabled = result.data.activeProfiles.indexOf("no-swagger") !== -1;
                return response;
            }
        });
    }
    return dataPromise;
  }
}
