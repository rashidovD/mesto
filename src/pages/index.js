
// импорты данных(классов и констант) из связанных файлов js
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  formElement,
  popupAddCardButton,
  initialCards,
  cardsContainer,
  editButton,
  addButton,
  nameInput,
  jobInput,
  validationSettings,
} from '../utils/constants.js'

import '../pages/index.css';

// ВАЛИДАЦИЯ ФОРМ
const editFormValidation = new FormValidator(validationSettings, formElement);
const placeFormValidation = new FormValidator(validationSettings, popupAddCardButton);

// попапы
// ----
const userInfo = new UserInfo({
  userSelector: '.profile__name',
  jobSelector: '.profile__job',
})

const generateCard = data => new Card(data, '#card-template', ({name, link}) => popupImg.open(name, link)).generateCard();


// профиль юзера
const profilePopup = new PopupWithForm(
  '.popup',
  dataForm => {
    userInfo.setUserInfo(dataForm);
  },
  editFormValidation,
  () => {
    const {userName, userJob} = userInfo.getUserInfo();

    nameInput.value = userName;
    jobInput.value = userJob;
// чтобы при открытии формы при валидных полях кнопка была активной
    const event = new Event('input');
    nameInput.dispatchEvent(event);
    jobInput.dispatchEvent(event);
  }
)

// новое место
const placePopup = new PopupWithForm(
  '.popup-place',
  item => cardList.setItem(generateCard(item)),
  placeFormValidation
)

// Инстанс(экземпляр) класса Section(2 параметра) / отрисовка карточек
// первый параметр-объект с двумя свойствами, массивом (items) и функцией (render - инструкция)
// второй параметр контейнер для добавления карточек

const cardList = new Section({
  items: initialCards,
  renderer: (item) => cardList.setItem(generateCard(item))
}, cardsContainer);
// вызов метода renderItems класса Section, для отрисовки карточек
cardList.renderItems();



const popupImg = new PopupWithImage('.popup-image');


// СЛУШАТЕЛИ СОБЫТИЙ
// открытие попапа редактирования профиля
editButton.addEventListener('click', () => {
  profilePopup.open();
})
// открытие попапа нового места
addButton.addEventListener('click', () => {
  placePopup.open()
});




// // включение валидации
editFormValidation.enableValidation();
placeFormValidation.enableValidation();




