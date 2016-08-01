import { customElement } from 'aurelia-framework';

@customElement('active-link')
class ActiveLink {
  constructor() {
  }

  activate(element, attrs) {
    let clazz = attrs.activeLink;
    let path = attrs.href;
    //hack because path does both return including hashbang
    path = path.substring(1);
    this.location = path;
  }

    @bindable('location.path')
    function(newPath) {
      path === newPath ? element.addClass(clazz) : element.removeClass(clazz);
    }
  }
}
