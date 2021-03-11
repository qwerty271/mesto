import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._formElement = this._popup.querySelector(".form");
    this._inputList = Array.from(this._popup.querySelectorAll(".form__item"));
  }

  _getInputValues() {
    this.inputs = {};
    this._inputList.forEach((input) => {
      this.inputs[input.name] = input.value;
    });
    return this.inputs;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", () => {
      this._formSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
