import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)

// - See http://ilikekillnerds.com/2015/10/all-about-the-aurelia-fetch-client/
// - See https://gist.github.com/bryanrsmith/14caed2015b9c54e70c3
export default class Resource {
  constructor(http) {
    http.configure(config => {
        config
            .withBaseUrl('api/')
            .withDefaults({
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'Fetch'
                }
            })
            .withInterceptor({
                request(request) {
                    console.log(`Requesting ${request.method} ${request.url}`);
                    return request; // you can return a modified Request, or you can short-circuit the request by returning a Response
                },
                response(response) {
                    console.log(`Received ${response.status} ${response.url}`);
                    return response; // you can return a modified Response
                }
            });
    }); 
    this.http = http;   
  }

  fetch(path, params) {
    return this.http.fetch(path, params);
  }

  fetchData(path, params, done) {
    this.http.fetch(path, params).then((response) => {
      done(response.json.data);
    });
  }
}
