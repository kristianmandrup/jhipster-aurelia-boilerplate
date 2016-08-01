import {inject} from 'aurelia-framework';
import {I18N} from 'aurelia-i18n';

@inject(I18N)
export class LanguageSwitcher {
    constructor(i18n) {
        this.i18n = i18n;
    }

    this.languages = [
        { value:'en', text:'English (Saesneg)'},
        { value:'cy', text: 'Cymru (Welsh)'},
        { value:'ru', text: 'Pусский (Russian)'},
        { value:'de', text: 'Deutsche (German)'},
    ];

    selectedLanguage = 'en';

    switchLanguage() {
        this.i18n.setLocale(this.selectedLanguage);
    }
}
