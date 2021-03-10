// const { default: Popup } = require("./Popup");
import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector, name, link) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._image = document
      .querySelector(".popup_type_image")
      .querySelector(".popup__image");
    this._title = document
      .querySelector(".popup_type_image")
      .querySelector(".popup__title");
    this._name = name;
    this._link = link;
  }

  // open() {
  //   this._popupSelector.classList.add("popup_is_opened");
  //   document.addEventListener("keydown", this._handleEscClose());
  //   this._image.src = this._link;
  //   this._image.alt = this._name;
  //   this._title.textContent = this._name;
  // }

  open() {
    super.open();
    this._image.alt = this._name;
    this._image.src = this._link;
    this._title.textContent = this._name;
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
