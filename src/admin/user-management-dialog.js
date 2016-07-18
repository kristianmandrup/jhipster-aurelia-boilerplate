import {inject} from 'aurelia-framework';
import LanguageService from 'language_service';
import User from 'user';

@inject(User, LanguageService)
export default class UserManagementDialogController {
  constructor(User, LanguageService, $stateParams, $uibModalInstance, entity) {
    this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    this.clear = clear;
    this.languages = null;
    this.save = save;
    this.user = entity;

    JhiLanguageService.getAll().then((languages) => {
      this.languages = languages;
    });
  }

  clear () {
      $uibModalInstance.dismiss('cancel');
  }

  onSaveSuccess (result) {
    this.isSaving = false;
    $uibModalInstance.close(result);
  }

  onSaveError () {
    this.isSaving = false;
  }

  save () {
    this.isSaving = true;
    if (this.user.id !== null) {
        User.update(this.user, onSaveSuccess, onSaveError);
    } else {
        User.save(this.user, onSaveSuccess, onSaveError);
    }
  }
}
