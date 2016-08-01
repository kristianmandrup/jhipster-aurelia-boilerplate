import Service from '../base';

export default class PasswordResetInit extends Service {
  constructor(resource) {
    super(resource, 'api/account/reset_password/init');
  }
}
