// Add format currency
const formatCurrency = n => {
  const currency = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 2,
  });

  return currency.format(n);
};

// Navigation
const navigation = () => {
  'use strict';

  // Making calculators switch
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
      if (el.classList.contains('navigation__link_active')) {
        el.classList.remove('navigation__link_active');
      }
    });
  };

  navigationLinks.forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      removeActiveLinks();
      e.target.classList.add('navigation__link_active');

      getCalc(e.target.dataset.tax);
    });
  });
};

// Self-employment calculator
const selfDeploymentCalculator = () => {
  'use strict';
  const selfEmployment = document.querySelector('.self-employment');
  const formSelfEmployment = selfEmployment.querySelector('.calc__form');
  const resultTaxSelfemployment = selfEmployment.querySelector('.result__tax');
  const calcCompensation = selfEmployment.querySelector('.calc__label_compensation');
  const resultBlockCompensation = selfEmployment.querySelectorAll('.result__block_compensation');
  const resultTaxCompensation = selfEmployment.querySelector('.result__tax_compensation');
  const resultTaxRestCompensation = selfEmployment.querySelector('.result__tax_rest-compensation');
  const resultTaxResult = selfEmployment.querySelector('.result__tax_result');

  const checkCompensation = () => {
    const setDisplay = formSelfEmployment.addCompensation.checked ? '' : 'none';
    calcCompensation.style.display = setDisplay;
    resultBlockCompensation.forEach(el => {
      el.style.display = setDisplay;
    });
  };

  checkCompensation();

  formSelfEmployment.addEventListener('input', () => {
    const resIndividual = formSelfEmployment.individual.value * 0.04;
    const resEntity = formSelfEmployment.entity.value * 0.06;

    const tax = resIndividual + resEntity;
    const benefit = formSelfEmployment.compensation.value;
    const resBenefit =
      formSelfEmployment.individual.value * 0.01 + formSelfEmployment.entity.value * 0.02;
    const finalBenefit = benefit - resBenefit > 0 ? benefit - resBenefit : 0;
    const finalTax = tax - (benefit - finalBenefit);

    checkCompensation();

    formSelfEmployment.compensation.value =
      formSelfEmployment.compensation.value > 10000 ? 10000 : formSelfEmployment.compensation.value;

    resultTaxSelfemployment.textContent = formatCurrency(tax);
    resultTaxCompensation.textContent = formatCurrency(benefit - finalBenefit);
    resultTaxRestCompensation.textContent = formatCurrency(finalBenefit);
    resultTaxResult.textContent = formatCurrency(finalTax);
  });
};

// AUSN calculator
const ausnCalculator = () => {
  'use strict';
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
      calcLabelExpenses.style.display = '';
      resultTaxTotal.textContent = formatCurrency(
        (ausnForm.income.value - ausnForm.expenses.value) * 0.2
      );
    }
  });
};

// OSNO calculator
const osnoCalculator = () => {
  'use strict';
  const osno = document.querySelector('.osno');
  const osnoForm = osno.querySelector('.calc__form');
  const ndflExpenses = osno.querySelector('.result__block_ndfl-expenses');
  const ndflIncome = osno.querySelector('.result__block_ndfl-income');
  const profit = osno.querySelector('.result__block_profit');

  const resultTaxNds = osno.querySelector('.result__tax_nds');
  const resultTaxProperty = osno.querySelector('.result__tax_property');
  const resultTaxNdflExpenses = osno.querySelector('.result__tax_ndfl-expenses');
  const resultTaxNdflIncome = osno.querySelector('.result__tax_ndfl-income');
  const resultTaxProfit = osno.querySelector('.result__tax_profit');

  const checkFormBusiness = () => {
    if (osnoForm.formBusiness.value === 'ИП') {
      ndflExpenses.style.display = '';
      ndflIncome.style.display = '';
      profit.style.display = 'none';
    }
    if (osnoForm.formBusiness.value === 'ООО') {
      ndflExpenses.style.display = 'none';
      ndflIncome.style.display = 'none';
      profit.style.display = '';
    }
  };

  checkFormBusiness();

  osnoForm.addEventListener('input', () => {
    checkFormBusiness();

    const income = osnoForm.income.value;
    const expenses = osnoForm.expenses.value;
    const property = osnoForm.property.value;

    const nds = income * 0.2;
    const taxPropertys = property * 0.02;
    const profit = income - expenses;
    const ndflExpensesTotal = profit * 0.13;
    const ndflIncomeTotal = (income - nds) * 0.13;
    const taxProfit = profit * 0.2;

    resultTaxNds.textContent = nds;
    resultTaxProperty.textContent = taxPropertys;
    resultTaxNdflExpenses.textContent = ndflExpensesTotal;
    resultTaxNdflIncome.textContent = ndflIncomeTotal;
    resultTaxProfit.textContent = taxProfit;
  });
};

// USN calculator
const usnCalculator = () => {
  'use strict';
  const usn = document.querySelector('.usn');
  const usnForm = usn.querySelector('.calc__form');

  const calcLableExpenses = usn.querySelector('.calc__lable_expenses');
  const calcLabelProperty = usn.querySelector('.calc__label_property');
  const resultBlockProperty = usn.querySelector('.result__block_property');

  const resultTaxFinal = usn.querySelector('.result__tax_final');
  const resultTaxProperty = usn.querySelector('.result__tax_property');
};

navigation();

selfDeploymentCalculator();

ausnCalculator();

osnoCalculator();

usnCalculator();
