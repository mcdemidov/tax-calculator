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

  // Making calculators switch
  navigationLinks.forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      removeActiveLinks();
      e.target.classList.add('navigation__link_active');

      getCalc(e.target.dataset.tax);
    });
  });

  // AUSN calculator
  const ausn = document.querySelector('.ausn');
  const ausnForm = ausn.querySelector('.calc__form');
  const resultTaxTotal = ausn.querySelector('.result_tax_total');
  const calcLabelExpenses = ausn.querySelector('.calc__label_expenses');

  calcLabelExpenses.style.display = 'none';

  ausnForm.addEventListener('input', () => {
    if (ausnForm.type.value === 'income') {
      calcLabelExpenses.style.display = 'none';
      resultTaxTotal.textContent = ausnForm.income.value * 0.08;
      ausnForm.expenses.value = '';
    }

    if (ausnForm.type.value === 'expenses') {
      calcLabelExpenses.style.display = 'block';
      resultTaxTotal.textContent = (ausnForm.income.value - ausnForm.expenses.value) * 0.2;
    }
  });
};

taxCalculator();
