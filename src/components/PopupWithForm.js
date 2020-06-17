import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, validationForm, handleOpen = () => {}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._validationForm = validationForm;
    this._handleOpen = handleOpen;
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
   this._form.addEventListener('submit', (evt) => {
     evt.preventDefault();
     this._handleFormSubmit(this._getInputValues());
     this.close();
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


