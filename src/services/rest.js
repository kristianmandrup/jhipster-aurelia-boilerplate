export class RestService {
  constructor(service) {
    this.service = service;
  }

  // GET
  query() {
    return this.service.resource.fetch(this.service.url, (response) => {
        // expose response
        return response;
      }
    }
  }

  // GET list
  getAll() {

  }

  // POST
  save() {
  }

  // PUT
  update() {

  }

  // DELETE
  delete() {
  }
}
