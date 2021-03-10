import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._formSubmit = formSubmit;
    this._formSelector = this._popupSelector.querySelector(".form");
    this._titleInput = this._formSelector.querySelector(
      ".form__item_type_title"
    );
    this._linkInput = this._formSelector.querySelector(".form__item_type_link");
  }

  _getInputValues() {
    this._inputList = Array.from(
      this._popupSelector.querySelectorAll(".form__item")
    );
    this.inputs = {};
    this._inputList.forEach((input) => {
      this.inputs[input.name] = input.value;
    });
    return this.inputs;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formSelector.addEventListener("submit", () => {
      this._formSubmit(this._getInputValues());
    });
  }

  open() {
    super.open();
  }

  close() {
    super.close();
    this._formSelector.reset();
  }
}
