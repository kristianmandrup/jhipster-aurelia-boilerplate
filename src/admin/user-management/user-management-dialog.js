import {inject} from 'aurelia-framework';
import LanguageService from 'language_service';
import User from 'user';

@inject(User, LanguageService)
export default class UserManagementDialogController {
  constructor(User, LanguageService, stateParams, uibModalInstance, entity) {
    this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    this.clear = clear;
    this.languages = null;
    this.save = save;
    this.user = entity;
    this.stateParams = stateParams; 
    this.uibModalInstance = uibModalInstance; 

    JhiLanguageService.getAll().then((languages) => {
      this.languages = languages;
    });
  }

  clear () {
      this.uibModalInstance.dismiss('cancel');
  }

  onSaveSuccess (result) {
    this.isSaving = false;
    this.uibModalInstance.close(result);
  }

  onSaveError () {
    this.isSaving = false;
  }

  save () {
    this.isSaving = true;
    if (this.user.id !== null) {
        User.update(this.user, this.onSaveSuccess, this.onSaveError);
    } else {
        User.save(this.user, this.onSaveSuccess, this.onSaveError);
    }
  }
}
