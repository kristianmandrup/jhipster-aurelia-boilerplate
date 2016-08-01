import Principal from './principal.service';

@customElement('has-any-authority')
@inject(Principal)
class HasAnyAuthority {
  constructor (principal) {
    this.principal = principal;
  }

  activate(element, attrs) {
    let authorities = attrs.hasAnyAuthority.replace(/\s+/g, '').split(',');

    if (authorities.length > 0) {
        defineVisibility(true);
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
      var result;
      if (reset) {
          setVisible();
      }

      result = this.principal.hasAnyAuthority(authorities);
      if (result) {
          setVisible();
      } else {
          setHidden();
      }
  }
}
