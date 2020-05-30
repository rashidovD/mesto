import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// Объявление DOM элементов
const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.places');
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const popupPlaceClose = document.querySelector('.popup__add-close');
const popupClose = document.querySelector('.popup__close');

// ФОРМЫ С ПОЛЯМИ
// формы и поля редактирования профиля
const formElement = document.forms.userInfo;
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.job;
// формы и поля добавления новых карточек
const popupAddCardButton = document.forms.placeInfo;
const placeInput = popupAddCardButton.elements.place;
const urlInput = popupAddCardButton.elements.link;

const popup = document.querySelector('.popup');
const popupPlace = document.querySelector('.popup-place');

// Шесть карточек «из коробки»
const initialCards = [{
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

// function - рендер карточек 'из коробки' на страницу
const renderCards = (arrayCards, container) => {
  arrayCards.forEach((item) => {
    const card = new Card(item, '#card-template');
    const cardElement = card.generateCard();
    container.append(cardElement);
  });
};

// объявление DOM элементов после создания карточки
const popupImgClose = document.querySelector('.popup-image__close');
const popupImageImage = document.querySelector('.popup-image__image');
const popupImage = document.querySelector('.popup-image');
const popupImgText = document.querySelector('.popup-image__text');

// ЗАКРЫТЬ или ОТКРЫТЬ Popup
export function togglePopup(popupElem) {
  popupElem.classList.toggle('popup_opened');
  // вешаем события при открытии модального окна и удаляем при закрытии
  if (popupElem.classList.contains('popup_opened')) {
    document.addEventListener('keydown', closeEsc);
    document.addEventListener('click', closeOverlay);
  } else {
    document.removeEventListener('keydown', closeEsc);
    document.removeEventListener('click', closeOverlay);
  }
}

// Заполнение полей формы при открытии
function fillFields() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  // чтобы кнопка была активной при открытии попапа при валидных полях
  const event = new Event('input');
  nameInput.dispatchEvent(event);
  jobInput.dispatchEvent(event);
}

// функция для сохранения значений из полей формы при нажатии кнопки "сохранить"
function addInfo(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(popup);
}

// закрыть кнопкой Esc
function closeEsc(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape' && popupOpened) {
    togglePopup(popupOpened);
  }
}

// закрыть кликом по фону
function closeOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    togglePopup(evt.target.closest('.popup'));
  }
}

// Настройки валидации форм (объект с настройками и элемент формы)
const editFormValidation = new FormValidator({
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button__elem',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}, formElement);

const placeFormValidation = new FormValidator({
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button__elem',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}, popupAddCardButton);

// СЛУШАТЕЛИ С О Б Ы Т И Й

// добавление карточек при нажатии кнопки 'создать'
popupAddCardButton.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const card = new Card({
    name: placeInput.value,
    link: urlInput.value
  }, '#card-template');
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  togglePopup(popupPlace);
  popupAddCardButton.reset();
});

addButton.addEventListener('click', function () {
  placeInput.value = '';
  urlInput.value = '';

  placeFormValidation.enableValidation();

  // при каждом открытии поля добавления картинки пустые,
  // поэтому отключаем кнопку
  const button = document.querySelector('.popup__add-button');
  if (placeInput.value.length <= 0 && urlInput.value.length <= 0) {
    button.classList.add('popup__button_disabled');
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove('popup__button_disabled');
    button.removeAttribute('disabled');
  }

  togglePopup(popupPlace);
});

popupPlaceClose.addEventListener('click', function () {
  togglePopup(popupPlace);
});

formElement.addEventListener('submit', addInfo);

editButton.addEventListener('click', function () {
  fillFields();
  togglePopup(popup);
});

popupClose.addEventListener('click', function () {
  togglePopup(popup);
  formElement.reset();
});

popupImgClose.addEventListener('click', function () {
  togglePopup(popupImage);
});

// вызов рендера карточек
renderCards(initialCards, cardsContainer);

// включение валидации
editFormValidation.enableValidation();
placeFormValidation.enableValidation();
