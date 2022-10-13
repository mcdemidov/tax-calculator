'use strict';

const navigationLinks = document.querySelectorAll('.navigation__link');
const calcElems = document.querySelectorAll('.calc');

//for (let i = 0; i < navigationLinks.length; i++) {

//  console.log(i, navigationLinks[i]);
//}

const getCalc = el => {
  calcElems.forEach(item => {
    if (item.dataset.tax === el) {
      item.classList.add('calc_active');
    } else {
      item.classList.remove('calc_active');
    }
  });
};

const clearActiveLink = () => {
  navigationLinks.forEach(el => {
    if (el.classList.contains('navigation__link_active')) {
      el.classList.remove('navigation__link_active');
    }
  });
};

navigationLinks.forEach(el => {
  el.addEventListener('click', e => {
    let link = e.target;
    clearActiveLink();
    link.classList.add('navigation__link_active');

    getCalc(link.dataset.tax);
  });
});

console.log(navigationLinks);
