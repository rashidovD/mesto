

// Объявление DOM элементов
// контейнер для вставки карточек
export const cardsContainer = '.places';
// Профиль инфо
export const profile = document.querySelector('.profile');
export const editButton = profile.querySelector('.profile__edit-button');
export const addButton = profile.querySelector('.profile__add-button');
// ФОРМЫ С ПОЛЯМИ
// формы и поля редактирования профиля
export const formElement = document.forms.userInfo;
export const nameInput = formElement.elements.name;
export const jobInput = formElement.elements.job;
// формы и поля добавления новых карточек
export const popupAddCardButton = document.forms.placeInfo;

export const avatarInfo = document.forms.avatarInfo;

// Настройки валидации форм (2 параметра у FormValidator - объект с настройками и элемент формы)
export const validationSettings = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button__elem',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const baseURL = 'https://mesto.nomoreparties.co/v1/cohort-12';
export const token = 'd358cac0-a420-4d4c-9dd2-c14a231c4bbb';
