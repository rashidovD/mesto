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

// console.log(initialCards[4]);

// функция создания карточек
function createCard(name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.place__name').textContent = name;
  cardElement.querySelector('.place__image').src = link;
  cardElement.querySelector('.place__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('place__like_active');
  })

  cardElement.querySelector('.place__image').addEventListener('click', handleDigitClick);

  cardsContainer.append(cardElement);
}

// функция добавления шаблонных карточек 'из коробки'
function addTemplateCard () {
  for (let i = 0; i < initialCards.length; i++) {
    const card = initialCards[i];
    const name = card.name;
    const link = card.link;
    createCard(name, link);
  }
}
// вызов функции добавления шаблонных карточек
addTemplateCard();

// объявление DOM элементов после создания карточки
const popupImgclose = document.querySelector('.popup-image__close');
const popupImageImage = document.querySelector('.popup-image__image');
const popupImage = document.querySelector('.popup-image');
const popupImgText = document.querySelector('.popup-image__text');


// Функция открытия popup'a 'редактирования имени и работы в профиле'
function openPopup() {
  let nameInput = document.querySelector('.popup__input_type_name');
  let jobInput = document.querySelector('.popup__input_type_job');
  let popupOpened = document.querySelector('.popup');

  // Заполнение полей формы при открытии
  nameInput.value = profile.querySelector('.profile__name').textContent;
  jobInput.value = profile.querySelector('.profile__job').textContent;

  popupOpened.classList.add('popup_opened');
}

// функция открытия попапа 'заполнения карточек'
function openPopupPlace() {
  let popupOpened = document.querySelector('.popup-place')
  popupOpened.classList.add('popup_opened');
}

// функция закрытия попапа 'заполнения карточек'
function closePopupPlace() {
  let popupOpened = document.querySelector('.popup-place');
  popupOpened.classList.remove('popup_opened');
}

// функция закрытия popup через кнопку закрытия
function closePopup() {
  let nameInput = document.querySelector('.popup__input_type_name');
  let jobInput = document.querySelector('.popup__input_type_job');
  let popupOpened = document.querySelector('.popup');

  popupOpened.classList.remove('popup_opened');

  // сброс несохраненных данных формы
  nameInput.value = '';
  jobInput.value = '';
}

// функция удаления карточки
document.querySelector('.places').onclick = function(e) {
  const btn = e.target.closest('.place__delete-card');
  if (!btn) {
    return;
  }
  btn.parentElement.remove();
}

// функция закрытия изображения
function imgClosed() {
  let popupOpened = document.querySelector('.popup-image');
  popupOpened.classList.remove('popup_opened');
}





// увеличение изображений
function handleDigitClick(event) {
  console.log(event);
  popupImage.classList.add('popup_opened');
  popupImageImage.src = event.target.src;
  popupImgText.textContent = event.target.parentNode.textContent;
}




// функция для сохранения значений из полей формы при нажатии кнопки "сохранить"
function addInfo(evt) {
  evt.preventDefault();
  let nameInput = document.querySelector('.popup__input_type_name');
  let jobInput = document.querySelector('.popup__input_type_job');

  profile.querySelector('.profile__name').textContent = nameInput.value;
  profile.querySelector('.profile__job').textContent = jobInput.value;
  closePopup();
}

// слушатели событий
popupAddCardButton.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const name = document.querySelector('.popup__input_type_place');
  const link = document.querySelector('.popup__input_type_url');
  createCard(name.value, link.value);
  closePopupPlace();
  name.value = '';
  link.value = '';
})


addButton.addEventListener('click', openPopupPlace);
popupPlaceClose.addEventListener('click', closePopupPlace);
formElement.addEventListener('submit', addInfo);
editButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);


popupImgclose.addEventListener('click', imgClosed);


