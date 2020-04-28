// Объявление DOM элементов
const content = document.querySelector('.content');
const cardsContainer = content.querySelector('.places');
const profile = document.querySelector('.profile');
const profileBox = profile.querySelector('.profile__box');
const profileInfo = profile.querySelector('.profile__info');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const popupPlaceClose = document.querySelector('.popup__add-close');
const popupClose = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const popupAddCardButton = document.querySelector('.popup-place__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const popup = document.querySelector('.popup');
const popupPlace = document.querySelector('.popup-place');
const placeInput = document.querySelector('.popup__input_type_place');
const urlInput = document.querySelector('.popup__input_type_url');


// Шесть карточек «из коробки»
const initialCards = [
  {
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

// функция создания карточек
function createCard(name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.place__name').textContent = name;
  cardElement.querySelector('.place__image').src = link;

  cardElement.querySelector('.place__like').addEventListener('click', handleClickLike);
  cardElement.querySelector('.place__image').addEventListener('click', handleDigitClick);


  return cardElement;
}


// функция добавления шаблонных карточек 'из коробки'
function addTemplateCards () {
  for (let i = 0; i < initialCards.length; i++) {
    const card = initialCards[i];
    const name = card.name;
    const link = card.link;
    const cardElement = createCard(name, link);
    cardsContainer.append(cardElement);
  }
}
// вызов функции добавления шаблонных карточек
addTemplateCards();

// объявление DOM элементов после создания карточки
const popupImgclose = document.querySelector('.popup-image__close');
const popupImageImage = document.querySelector('.popup-image__image');
const popupImage = document.querySelector('.popup-image');
const popupImgText = document.querySelector('.popup-image__text');


// Функция открытия popup'a 'редактирования имени и работы в профиле'
function openPopup() {
  // Заполнение полей формы при открытии
  nameInput.value = profile.querySelector('.profile__name').textContent;
  jobInput.value = profile.querySelector('.profile__job').textContent;
  popup.classList.add('popup_opened');
}

// функция открытия попапа 'заполнения карточек'
function openPopupPlace() {
  popupPlace.classList.add('popup_opened');
}

// функция закрытия popup через кнопку закрытия
function closePopup() {
  popup.classList.remove('popup_opened');
  // сброс несохраненных данных формы
  nameInput.value = '';
  jobInput.value = '';
}

// функция закрытия попапа 'заполнения карточек'
function closePopupPlace() {
  popupPlace.classList.remove('popup_opened');
}

// функция закрытия изображения
function imgClosed() {
  popupImage.classList.remove('popup_opened');
}

// функция удаления карточки
document.querySelector('.places').onclick = function(e) {
  const btn = e.target.closest('.place__delete-card');
  const card = e.target.closest('.place');
  if (!btn) {
    return;
  }
  card.remove();
}


// функция обработчик лайка
function handleClickLike (evt) {
  evt.target.classList.toggle('place__like_active');
}


// увеличение изображений
function handleDigitClick(event) {
  popupImage.classList.add('popup_opened');
  popupImageImage.src = event.target.src;
  popupImgText.textContent = event.target.parentNode.textContent;
}


// функция для сохранения значений из полей формы при нажатии кнопки "сохранить"
function addInfo(evt) {
  evt.preventDefault();

  profile.querySelector('.profile__name').textContent = nameInput.value;
  profile.querySelector('.profile__job').textContent = jobInput.value;
  closePopup();
}

// слушатели событий
popupAddCardButton.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const cardElement = createCard(placeInput.value, urlInput.value);
  cardsContainer.prepend(cardElement);
  closePopupPlace();

  placeInput.value = '';
  urlInput.value = '';
})


addButton.addEventListener('click', openPopupPlace);
popupPlaceClose.addEventListener('click', closePopupPlace);
formElement.addEventListener('submit', addInfo);
editButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);


popupImgclose.addEventListener('click', imgClosed);


// комментарии к коду как МОЖНО УЛУЧШИТЬ приняты к сведению,
//  буду их исправлять до следующего спринта,
//  а то сейчас по работе плотно не получается этим заняться
