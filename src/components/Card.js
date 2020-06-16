export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._card = null;
  }

  _setEventListeners() {
    this._card.querySelector('.place__like').addEventListener('click', (e) => {
      this._handleClickLike(e);
    });

    this._card.querySelector('.place__delete-card').addEventListener('click', (e) => {
      this._handleDelete(e);
    });

    this._card.querySelector('.place__image').addEventListener('click', () => this._handleCardClick({
      name: this._name,
      link: this._link
    }));
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
