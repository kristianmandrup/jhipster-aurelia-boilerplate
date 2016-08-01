import Service from '../base';

export default class Sessions extends Service {
  constructor(resource) {
    super(resource, 'api/account/sessions/:series');
  }
}
