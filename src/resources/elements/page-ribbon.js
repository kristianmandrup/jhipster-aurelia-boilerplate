import ProfileService from './profile.service';

@inject(ProfileService)
class PageRibbon {
  constructor(profileService) {

  activated(element, attrs) {
    this.profileService.getProfileInfo().then((response) => {
        if (response.ribbonEnv) {
            this.ribbonEnv = response.ribbonEnv;
            element.addClass(response.ribbonEnv);
            element.removeClass('hidden');
        }
    });
  }
}
