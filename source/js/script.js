var headerMain = document.querySelector('.main-header');
var headerToggle = document.querySelector('.main-header__toggle');
// var modal = document.querySelector(".modal");
// var promoButton = document.querySelector(".promo__button");

headerMain.classList.remove('main-header--nojs');

headerToggle.addEventListener('click', function () {
  if (headerMain.classList.contains('main-header--closed')) {
    headerMain.classList.remove('main-header--closed');
    headerMain.classList.add('main-header--opened');
  } else {
    headerMain.classList.add('main-header--closed');
    headerMain.classList.remove('main-header--opened');
  }
});

// promoButton.addEventListener('click', function () {
//   if (modal.classList.contains('modal--closed')) {
//     modal.classList.remove('modal--closed');
//     modal.classList.add('modal--opened');
//   } else {
//     modal.classList.add('modal--closed');
//     modal.classList.remove('modal--opened');
//   }
// });