export default class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }

  _showError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation = () => {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  resetError() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  }

  // _showError(formElement, inputElement, errorMessage) {
  //   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //   inputElement.classList.add(this._inputErrorClass);
  //   errorElement.textContent = errorMessage;
  //   errorElement.classList.add(this._errorClass);
  // }

  // _hideError(formElement, inputElement) {
  //   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  //   inputElement.classList.remove(this._inputErrorClass);
  //   errorElement.classList.remove(this._errorClass);
  //   errorElement.textContent = "";
  // }

  // _checkInputValidity = (formElement, inputElement) => {
  //   if (!inputElement.validity.valid) {
  //     this._showError(
  //       formElement,
  //       inputElement,
  //       inputElement.validationMessage
  //     );
  //   } else {
  //     this._hideError(formElement, inputElement);
  //   }
  // };

  // _setEventListeners = (formElement) => {
  //   const inputList = Array.from(
  //     formElement.querySelectorAll(this._inputSelector)
  //   );
  //   const buttonElement = formElement.querySelector(this._submitButtonSelector);
  //   this._toggleButtonState(inputList, buttonElement);
  //   inputList.forEach((inputElement) => {
  //     inputElement.addEventListener("input", () => {
  //       this._checkInputValidity(formElement, inputElement);
  //       this._toggleButtonState(inputList, buttonElement);
  //     });
  //   });
  // };

  // enableValidation = () => {
  //   const formList = Array.from(document.querySelectorAll(this._formSelector));
  //   formList.forEach((formElement) => {
  //     formElement.addEventListener("submit", (evt) => {
  //       evt.preventDefault();
  //     });
  //     this._setEventListeners(formElement);
  //   });
  // };

  // _hasInvalidInput = (inputList) => {
  //   return inputList.some((inputElement) => {
  //     return !inputElement.validity.valid;
  //   });
  // };

  // _toggleButtonState = (inputList, buttonElement) => {
  //   if (this._hasInvalidInput(inputList)) {
  //     buttonElement.classList.add(this._inactiveButtonClass);
  //   } else {
  //     buttonElement.classList.remove(this._inactiveButtonClass);
  //   }
  // };

  // resetError(formElement) {
  //   const inputList = Array.from(
  //     formElement.querySelectorAll(this._inputSelector)
  //   );
  //   const buttonElement = formElement.querySelector(".form__button");
  //   this._buttonElement.classList.add(this._inactiveButtonClass);
  //   inputList.forEach((inputElement) => {
  //     this._hideError(formElement, inputElement);
  //   });
  // }
}
