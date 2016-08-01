import Service from '../base';

export default class Activate extends Service {
  constructor(resource) {
    super(resource, 'api/activate');
  }
}
