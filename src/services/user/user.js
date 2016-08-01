import Service from '../base';

export default class User extends Service {
  constructor(resource) {
    super(resource, 'api/users/:login');
  }
}
