import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup-image__image');
    this._imageText = this._popup.querySelector('.popup-image__text');
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._imageText.textContent = name;

    super.open();
  }
}
