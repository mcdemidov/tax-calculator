const taxCalculator = () => {
  'use strict';

  const navigationLinks = document.querySelectorAll('.navigation__link');
  const calcElems = document.querySelectorAll('.calc');

  // Find the desired calculator and make it active
  const getCalc = el => {
    calcElems.forEach(item => {
      item.dataset.tax === el
        ? item.classList.add('calc_active')
        : item.classList.remove('calc_active');
    });
  };

  // Remove active links
  const removeActiveLinks = () => {
    navigationLinks.forEach(el => {
      if (el.classList.contains('navigation__link_active'))
        el.classList.remove('navigation__link_active');
    });
  };

  //
  navigationLinks.forEach(el => {
    el.addEventListener('click', e => {
      removeActiveLinks();
      e.target.classList.add('navigation__link_active');

      getCalc(e.target.dataset.tax);
    });
  });
};

taxCalculator();
