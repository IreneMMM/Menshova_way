const pageHeaderToggle = document.querySelector('.page-header__toggle');
const pageHeader = document.querySelector('.page-header');
const catalog = document.querySelector('.catalog');
const pageBody = document.querySelector('.page-body');
const buyTourButtons = document.querySelectorAll('.button[data-modal="buy-tour"]');
const modals = document.querySelectorAll('.modal');
const modalBuyTour = document.querySelector('.modal--buy-tour');
const modalSuccess = document.querySelector('.modal--success');
const phoneBuyTour = modalBuyTour.querySelector('input[name="phone"]');
const emailBuyTour = modalBuyTour.querySelector('input[name="email"]');
const forms = document.querySelectorAll('form');
const inputForms = document.querySelectorAll('input');
const catalogNav = document.querySelector('.catalog-nav');
const catalogNavItems = document.querySelectorAll('.catalog-nav__link');
const catalogCards = document.querySelectorAll('.catalog__item');
const countriesList = document.querySelector('.countries__list');
const countriesCardLinks = document.querySelectorAll('.countries-card__link')
const PHONE_LENGTH = 10;

pageHeaderToggle.addEventListener('click', (evt) => {
  evt.preventDefault();
  pageHeader.classList.toggle('page-header--active');
  pageHeaderToggle.classList.toggle('page-header__toggle--active');
});

pageHeader.classList.remove('page-header--nojs');
pageHeader.classList.remove('page-header--active');
catalog.classList.remove('catalog--nojs');


let isStorageSupport = true;
let storagePhone = '';
let storageEmail = '';

try {
  storagePhone = localStorage.getItem('phone');
  storageEmail = localStorage.getItem('email');
} catch (err) {
  isStorageSupport = false;
}

const addLocalStorage = () => {
  if (isStorageSupport) {
    for (let i = 0; i < inputForms.length; i++) {
      if (inputForms[i].type === 'tel' || inputForms[i].type === 'email') {
        let storageKey = inputForms[i].name;
        localStorage.setItem(storageKey, inputForms[i].value);
      }
    }
  }
}

for (let i = 0; i < buyTourButtons.length; i++) {
  buyTourButtons[i].addEventListener('click', (evt) => {
    evt.preventDefault();
    modalBuyTour.classList.add('modal--show');
    pageBody.classList.add('page-body--no-scroll');
    phoneBuyTour.focus();

    if (storagePhone || storageEmail) {
      phoneBuyTour.value = storagePhone;
      emailBuyTour.value = storageEmail;
      phoneBuyTour.focus();
    } else {
      phoneBuyTour.focus();
    }
  });
};

window.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    if (modalBuyTour.classList.contains('modal--show')) {
      modalBuyTour.classList.remove('modal--show');
    } else if (modalSuccess.classList.contains('modal--show'))
      modalSuccess.classList.remove('modal--show');
    pageBody.classList.remove('page-body--no-scroll');
  }
});

for (let i = 0; i < modals.length; i++) {
  modals[i].addEventListener('click', (evt) => {
    if (evt.target.classList.contains('modal--show') || evt.target.classList.contains('modal__wrapper') || evt.target.classList.contains('modal__close')) {
      modals[i].classList.remove('modal--show');
      pageBody.classList.remove('page-body--no-scroll');
    }
  });
}

const showModalSuccess = () => {
  modalBuyTour.classList.remove('modal--show');
  modalSuccess.classList.add('modal--show');
  pageBody.classList.add('page-body--no-scroll');
}

const isCyrillic = (text) => {
  return /[а-я]/i.test(text);
}

const CustomValidation = (input) => {
  const inputValue = input.value;
  const validity = input.validity;

  if (validity.valid && inputValue.length > 0) {
    input.classList.add('form__input--error');
  } else {
    input.classList.remove('form__input--error');
  }

  if (input.type === 'tel') {
    input.setAttribute('minlenght', PHONE_LENGTH);

    if (isNaN(inputValue)) {
      input.setCustomValidity('Укажите телефон в формате +7 XXX XXX XX XX');
      input.classList.add('form__input--error');
    } else if (inputValue.length < PHONE_LENGTH) {
      input.setCustomValidity('Введите ещё ' + (PHONE_LENGTH - inputValue.length) + ' цифр');
    } else {
      input.setCustomValidity('');
    }
  }

  if (input.type === 'email') {
    if (isCyrillic(inputValue)) {
      input.setCustomValidity('Введите латинские символы');
      input.classList.add('form__input--error');
    } else {
      input.classList.remove('form__input--error');
      input.setCustomValidity('');
    }
  }

  input.reportValidity();
}

for (let i = 0; i < inputForms.length; i++) {
  inputForms[i].addEventListener('input', () => {
    CustomValidation(inputForms[i]);
  })
}

document.addEventListener('DOMContentLoaded', () => {

  const ajaxSend = async (formData) => {
    const fetchResp = await fetch('https://echo.htmlacademy.ru', {
      method: 'POST',
      body: formData
    });
    if (!fetchResp.ok) {
      throw new Error(`Ошибка по адресу ${url}, статус ошибки ${fetchResp.status}`);
    }
    return await fetchResp.text();
  };

  forms.forEach(form => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();

      const formData = new FormData(this);

      ajaxSend(formData)
        .then((response) => {
          showModalSuccess();
          addLocalStorage();
          console.log(response);
          form.reset();
        })
        .catch((err) => {
          console.error(err);
          alert('Ошибка! Данные не отправлены, попробуй снова');
        })
    });
  });
});


catalogNav.addEventListener('click', (evt) => {
  evt.preventDefault();

  if(evt.target.classList.contains('catalog-nav__link')) {
    let array = Array.from(catalogNavItems);
    let target = evt.target;
    let index = array.indexOf(target);


    array.forEach((item, i, arr) => {
      if(i === index) {
        if (item.dataset.catalogNav === catalogCards[i].id) {
          item.classList.add('catalog-nav__link--active');
          catalogCards[i].classList.add('catalog__item--active');
        }
      } else {
        item.classList.remove('catalog-nav__link--active');
        catalogCards[i].classList.remove('catalog__item--active');
      }
    });
  }
});

countriesList.addEventListener('click', (evt) => {
  if(evt.target.closest('.countries-card__link')) {
    let array = Array.from(countriesCardLinks);
    let target = evt.target.closest('.countries-card__link');
    let index = array.indexOf(target);

    array.forEach((item, i, arr) => {
      if(i === index) {
        if (item.dataset.countriesCard === catalogCards[i].id) {
          catalogNavItems[i].classList.add('catalog-nav__link--active');
          catalogCards[i].classList.add('catalog__item--active');
        }
      } else {
        catalogNavItems[i].classList.remove('catalog-nav__link--active');
        catalogCards[i].classList.remove('catalog__item--active');
      }
    });
  }
});