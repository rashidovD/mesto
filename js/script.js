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
const formElement = document.forms.userInfo;
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.job;

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

// функция создания карточек
function createCard(name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.place__name').textContent = name;
  cardElement.querySelector('.place__image').src = link;
  cardElement.querySelector('.place__image').alt = name;

  cardElement.querySelector('.place__like').addEventListener('click', handleClickLike);
  cardElement.querySelector('.place__image').addEventListener('click', handleDigitClick);
  cardElement.querySelector('.place__delete-card').addEventListener('click', handleDelete);

  return cardElement;
}

// добавлениe шаблонных карточек 'из коробки' методом forEach
function addTemplateCards(cards, container) {
  initialCards.forEach(function (i) {
    cards = i;
    container = cardsContainer;
    const cardElement = createCard(cards.name, cards.link);
    container.append(cardElement);
  })
}
// вызов функции добавления шаблонных карточек
addTemplateCards();

// объявление DOM элементов после создания карточки
const popupImgClose = document.querySelector('.popup-image__close');
const popupImageImage = document.querySelector('.popup-image__image');
const popupImage = document.querySelector('.popup-image');
const popupImgText = document.querySelector('.popup-image__text');

// ЗАКРЫТЬ или ОТКРЫТЬ Popup
function togglePopup(popupElem) {
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

// функция удаления карточки
function handleDelete(event) {
  const card = event.target.closest('.place');
  card.remove();
}

// функция обработчик лайка
function handleClickLike(evt) {
  evt.target.classList.toggle('place__like_active');
}

// увеличение изображений
function handleDigitClick(event) {
  togglePopup(popupImage);
  popupImageImage.src = event.target.src;
  popupImageImage.alt = event.target.alt;
  popupImgText.textContent = event.target.parentNode.textContent;
}

// функция для сохранения значений из полей формы при нажатии кнопки "сохранить"
function addInfo(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  togglePopup(popup);
}

// очистить залипший текст ошибки
const errorClear = (form) => {
  const listInput = Array.from(form.querySelectorAll('.popup__input'));
  listInput.forEach(input => {
    if (input.classList.contains('popup__input_type_error')) {
      hideInputError(form, input, 'popup__input_type_error', 'popup__input-error_active');
    }
  })
};

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

// СЛУШАТЕЛИ С О Б Ы Т И Й

// добавление карточек при нажатии кнопки 'создать'
popupAddCardButton.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const cardElement = createCard(placeInput.value, urlInput.value);
  cardsContainer.prepend(cardElement);
  togglePopup(popupPlace);
  popupAddCardButton.reset();
});

addButton.addEventListener('click', function () {
  placeInput.value = '';
  urlInput.value = '';
  errorClear(popupAddCardButton);
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
