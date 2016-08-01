import Resource from '../resource';
import RestService from './rest';

@inject(Resource);
class BaseService {
  constructor(resource, url) {
    this.resource = resource;
    this.url = url;
  }

  service() {
    return new RestService(this);
  }
}
