import defer from 'promise-defer';

class JhiLanguageService {
  constructor(http, languages) {
  }

  getAll () {
    var deferred = defer.defer();
    deferred.resolve(this.languages);
    return deferred.promise;
  }

  getCurrent () {
    // let deferred = defer.defer();
    // let language = translate.storage().get(key;
    //
    // deferred.resolve(language);
    //
    // return deferred.promise;
  }
}
