import Principal from './principal.service';

@customElement('has-any-authority')
@inject(Principal)
class HasAuthority {
  constructor (principal) {
    this.principal = principal;
  }

  activate(element, attrs) {
    this.authority = attrs.hasAuthority.replace(/\s+/g, '');

    if (authority.length > 0) {
      this.defineVisibility(true);
    }
  }

  @bindable('principal.isAuthenticated');
  // when this.principal.isAuthenticated() is true make element visible
  // => this.defineVisibility(true);


  setVisible() {
    element.removeClass('hidden');
  }

  setHidden() {
    element.addClass('hidden');
  }

  defineVisibility(reset) {
    if (reset) {
        this.setVisible();
    }

    this.principal.hasAuthority(authority)
        .then((result) => {
            if (result) {
                setVisible();
            } else {
                setHidden();
            }
        });
  }
}
