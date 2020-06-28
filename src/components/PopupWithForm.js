import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, validationForm, handleOpen = () => {}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._validationForm = validationForm;
    this._handleOpen = handleOpen;
    this._submitButton = this._popup.querySelector('.button');
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
 _setEventListeners() {
   super._setEventListeners();
   this._form = this._popup.querySelector('.form');
   this._form.addEventListener('submit', (e) => {
     e.preventDefault();
     this._handleFormSubmit(this._getInputValues());
     this._submitButton.textContent = 'Сохранение...';
   });
 }

 open() {
   this._validationForm.errorClear();
   this._handleOpen();
   super.open();
 }

 close() {
  super.close();
  this._form.reset();
 }
}


