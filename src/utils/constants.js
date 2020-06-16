
// Шесть карточек «из коробки»
export const initialCards = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];

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

// Настройки валидации форм (2 параметра у FormValidator - объект с настройками и элемент формы)
export const validationSettings = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button__elem',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

