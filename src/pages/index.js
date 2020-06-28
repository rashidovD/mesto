import '../pages/index.css';

// импорты данных(классов и констант) из связанных файлов js
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  baseURL,
  token,
  formElement,
  popupAddCardButton,
  avatarInfo,
  editButton,
  addButton,
  nameInput,
  jobInput,
  validationSettings,
} from '../utils/constants.js'

const api = new Api(baseURL, token);

const profileAva = document.querySelector('.profile__avabutton');

// ВАЛИДАЦИЯ ФОРМ
const editFormValidation = new FormValidator(validationSettings, formElement);
const placeFormValidation = new FormValidator(validationSettings, popupAddCardButton);
const avatarFormValidation = new FormValidator(validationSettings, avatarInfo);

// попапы
// ----
const userInfo = new UserInfo({
  userSelector: '.profile__name',
  jobSelector: '.profile__job',
  avaSelector: '.profile__avatar'
});

const generateCard = data => new Card(
  data,
  userInfo.getUserId(),
  '#card-template',
  ({name, link}) => popupImg.open(name, link),
  (id, delConfirm) => confirmDeletePopup.open(id, delConfirm),
  (id, liked) => api.likeCard(id, liked)
).generateCard();


// профиль юзера
const profilePopup = new PopupWithForm(
  '.popup',
  dataForm => {
    api.updUserInfo({
      name: dataForm.name,
      about: dataForm.job
    })
      .then(res => {
        userInfo.setUserInfo(res.name, res.about);
        profilePopup.close();
      })
      .catch(err => console.log(err))
      .finally(() => document.querySelector('.button__elem').textContent = 'Сохранить');
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
);

// новое место
const placePopup = new PopupWithForm (
  '.popup-place',
  dataForm => {
    api.uploadCard(dataForm)
    .then(res => {
      cardList.prependItem(generateCard(res));
      placePopup.close()
    })
    .catch(err => console.log(err))
    .finally(() => document.querySelector('.popup__add-button').textContent = 'Создать');
  },
  placeFormValidation
);

// попап подтверждения удаления
const confirmDeletePopup = new PopupWithConfirm(
  '.popup-delete',
  (id, delCard) => {
    api.deleteCard(id)
      .then(() => {
        delCard();
        confirmDeletePopup.close();
      })
      .catch(err => console.log(err));
  }
);

// изменить аватар
const changeAvatarPopup = new PopupWithForm(
  '.popup-avatar',
  ({link}) => {
    api.changeAvatar(link)
    .then(result => {
      userInfo.setUserAvatar(result.avatar);
      changeAvatarPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => document.querySelector('.popup__avatar-button').textContent = 'Сохранить');
  },
  avatarFormValidation
);


// для карточек
let cardList;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([{name, about, avatar, _id}, initialCards]) => {
    userInfo.setUserInfo(name, about);
    userInfo.setUserAvatar(avatar);
    userInfo.setUserId(_id);
    cardList = new Section({
      items: initialCards,
      renderer: item => cardList.appendItem(generateCard(item))
    }, '.places');
    cardList.renderItems();
  })
    .catch(err => console.log(err));


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
// открыть попап изменения аватара
profileAva.addEventListener('click', () => {
  changeAvatarPopup.open()
});



// // включение валидации
editFormValidation.enableValidation();
placeFormValidation.enableValidation();
avatarFormValidation.enableValidation();



