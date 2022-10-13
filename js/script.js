const taxCalculator = () => {
  'use strict';

  // Add format currency
  const formatCurrency = n => {
    const currency = new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 2,
    });

    return currency.format(n);
  };

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

  // Self-employment calculator

  const selfEmployment = document.querySelector('.self-employment');
  const formSelfEmployment = selfEmployment.querySelector('.calc__form');
  const resultTaxSelfemployment = selfEmployment.querySelector('.result__tax');

  formSelfEmployment.addEventListener('input', () => {
    const resIndividual = formSelfEmployment.individual.value * 0.04;
    const resEntity = formSelfEmployment.entity.value * 0.06;

    resultTaxSelfemployment.textContent = formatCurrency(resIndividual + resEntity);
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
      resultTaxTotal.textContent = formatCurrency(ausnForm.income.value * 0.08);
      ausnForm.expenses.value = '';
    }

    if (ausnForm.type.value === 'expenses') {
      calcLabelExpenses.style.display = 'block';
      resultTaxTotal.textContent = formatCurrency(
        (ausnForm.income.value - ausnForm.expenses.value) * 0.2
      );
    }
  });
};

taxCalculator();
