class MegaMenu extends HTMLElement {
  constructor() {
    super();
    var menuItems = this.querySelectorAll('[data-index]');
    var subMenus = this.querySelectorAll('[data-sub-menu]');
    var page = document.getElementById('MainContent');
    var header = document.querySelector('header');
    var topLevel = this.querySelectorAll('[data-toplevel-link]');
    var subMenuLinks = this.querySelectorAll('.site-nav__child-link');

    menuItems.forEach((item) => {
      item.addEventListener('mouseover', () => {
        setTimeout(this.revealHeader(item, subMenus, menuItems), 200);
      })
    })
    subMenus.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        var dataFlag = item.getAttribute('data-main'); 
        var menuItem = document.querySelector('[data-index="' + dataFlag + '"]'); 
      })
      item.addEventListener('mouseleave', () => {
        this.closeMenus(menuItems, subMenus);
      })
    })
    header.addEventListener('mouseenter', () => {
      this.closeMenus(menuItems, subMenus);
    })
    page.addEventListener('mouseenter', () => {
      this.closeMenus(menuItems, subMenus);
    })

    topLevel.forEach((item) => {
      item.addEventListener('mouseover', () => {
        this.showThirdLevel(item);
      })
    })

    subMenuLinks.forEach((item) => {
      item.addEventListener('mouseover', (e) => {
        this.stopImmediatePropagation(e);
      })
    })

  }

  revealHeader(item, subMenus, menuItems) {
    this.closeMenus(menuItems, subMenus);
    item.classList.remove('text-white');
    item.classList.add('text-brand-orange');
    var arrow = item.querySelector('svg');
    if(arrow) arrow.classList.add('rotate-180');

    if(item.matches(':hover')){
      var selector = item.getAttribute('data-index');
      var menuToOpen = document.querySelector('[data-sub-' + selector + ']'); 
      menuToOpen.classList.remove('hidden');
    }
  }

  closeMenus(menuItems, subMenus) {
    menuItems.forEach((item) => {
      item.classList.add('text-white');
      item.classList.remove('text-brand-orange');
      var arrow = item.querySelector('svg');
      if(arrow) arrow.classList.remove('rotate-180');
    })
    subMenus.forEach((item) => {
      item.classList.add('hidden');
    })
  }

  showThirdLevel(element) {
    let id = element.getAttribute('data-toplevel-link'),
      dropdowns = document.querySelectorAll('.third-level__dropdown');

    for(let i=0; i < dropdowns.length; i++) {
      let dropdown = dropdowns[i],
        dropdown_id = dropdown.getAttribute('data-toplevel-submenu');
      
      dropdown.classList.remove('active');
      if(dropdown_id == id) {
        dropdown.classList.add('active');
      }
    }
  }

  stopImmediatePropagation(event) {
    event.stopImmediatePropagation();
  }
}

customElements.define('mega-menu', MegaMenu);