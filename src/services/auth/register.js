import Service from '../base';

export default class Account extends Service {
  constructor(resource) {
    super(resource, 'api/register');
  }
}
