const showInputError = (formElem, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElem.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

const hideInputError = (formElem, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElem.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass)
  errorElement.value = '';
}

const checkInputValidity = (formElem, inputElement, {inputErrorClass, errorClass}) => {
  if (!inputElement.validity.valid) {
    showInputError(formElem, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElem, inputElement, inputErrorClass, errorClass);
  }
};

const setEventListeners = (formElem, {inputSelector, submitButtonSelector, inactiveButtonClass, ...other}) => {
  const inputList = Array.from(formElem.querySelectorAll(inputSelector));
  const buttonElement = formElem.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElem, inputElement, other);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    })
  })
}

const enableValidation = ({formSelector, ...other}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElem) => {
    formElem.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
    setEventListeners(formElem, other);
  })
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled', true);
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button__elem',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
