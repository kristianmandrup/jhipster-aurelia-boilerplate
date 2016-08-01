import JhiLanguageService from './language.service';

@inject(JhiLanguageService)
class JhiLanguageController {
  constructor(jhiLanguageService) {
    this.changeLanguage = changeLanguage;
    this.languages = null;
    this.jhiLanguageService = jhiLanguageService;

    jhiLanguageService.getAll().then(function (languages) {
        this.languages = languages;
    });
  }

  // TODO
  changeLanguage (languageKey) {
  }
}
