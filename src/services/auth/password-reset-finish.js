import Service from '../base';

export default class PasswordResetFinish extends Service {
  constructor(resource) {
    super(resource, 'api/account/reset_password/finish');
  }
}
