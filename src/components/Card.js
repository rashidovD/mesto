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

    this._cardElement = cardElement;
  }

  _getConstants () {
    this._imgElement = this._cardElement.querySelector('.place__image');
    this._imgTextElement = this._cardElement.querySelector('.place__name');
    this._likeButton = this._cardElement.querySelector('.place__like');
    this._deleteButton = this._cardElement.querySelector('.place__delete-card');
  }

  _handleClickLike(evt) {
    evt.target.classList.toggle('place__like_active');
  }

  _handleDelete(event) {
    const card = event.target.closest('.place');
    card.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', (e) => {
      this._handleClickLike(e);
    });

    this._deleteButton.addEventListener('click', (e) => {
      this._handleDelete(e);
    });

    this._imgElement.addEventListener('click', () => this._handleCardClick({
      name: this._name,
      link: this._link
    }));
  }

  generateCard() {
    this._getTemplate();
    this._getConstants();
    this._setEventListeners();
    this._imgTextElement.textContent = this._name;
    this._imgElement.src = this._link;
    this._imgElement.alt = this._name;

    return this._cardElement;
  }
}
