import { togglePopup } from './script.js'



const popupImageImage = document.querySelector('.popup-image__image');
const popupImage = document.querySelector('.popup-image');
const popupImgText = document.querySelector('.popup-image__text');

function zoomImage(link, text) {
  togglePopup(popupImage);
  popupImageImage.src = link;
  popupImageImage.alt = text;
  popupImgText.textContent = text;
}

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);

    return cardElement;
  }

  _handleClickLike(evt) {
    evt.target.classList.toggle('place__like_active');
  }

  _handleDelete(event) {
    const card = event.target.closest('.place');
    card.remove();
  }

  _setEventListeners() {
    this._card.querySelector('.place__image').addEventListener('click', (e) => {
      zoomImage(e.target.src, e.target.alt)
    })

    this._card.querySelector('.place__like').addEventListener('click', (e) => {
      this._handleClickLike(e);
    });

    this._card.querySelector('.place__delete-card').addEventListener('click', (e) => {
      this._handleDelete(e);
    });

  }

  generateCard() {
    this._card = this._getTemplate();
    this._card.querySelector('.place__name').textContent = this._name;
    this._card.querySelector('.place__image').src = this._link;
    this._card.querySelector('.place__image').alt = this._name;
    this._setEventListeners();
    return this._card;
  }
}
