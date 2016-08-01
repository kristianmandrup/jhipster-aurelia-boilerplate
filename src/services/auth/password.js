import Service from '../base';

export default class Password extends Service {
  constructor(resource) {
    super(resource, 'api/account/change_password');
  }
}
