export default class Popup {
  constructor( popupSelector ) {
    this._popup = document.querySelector(popupSelector);
    this._setEventListeners();
    this._closeEsc = this._closeEsc.bind(this);
  }

  // закрыть кнопкой Esc
  _closeEsc(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  // закрыть кликом по фону
  _closeOverlay(e) {
    if(e.target === e.currentTarget) {
      this.close();
    }
  }

  _setEventListeners() {
    this._popup.querySelector('.popup__close').addEventListener('click', () => this.close());
    this._popup.addEventListener('click', (e) => this._closeOverlay(e));
  }

  open() {
    document.addEventListener('keydown', this._closeEsc);
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._closeEsc);
    this._popup.classList.remove('popup_opened');
  }
}

