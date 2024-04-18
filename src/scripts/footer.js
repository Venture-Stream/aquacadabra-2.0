function accordionFooter() {
  var tabHeadings = document.querySelectorAll('[data-footer-heading]');
  tabHeadings.forEach((item, index) => {
    var arrow = item.querySelector('svg'); 
    var key = item.getAttribute('data-tab-heading'); 
    var tab = document.querySelector('[data-tab="' + key + '"]'); 
      
    item.addEventListener('click', (e) => {
      e.preventDefault();
      tab.classList.toggle('hidden');
      arrow.classList.toggle('rotate-180')
  
    })
  
    tab.classList.add('hidden');
  })
}

window.addEventListener("load", accordionFooter());
window.addEventListener("resize", accordionFooter());
window.addEventListener("orientationChange", accordionFooter());