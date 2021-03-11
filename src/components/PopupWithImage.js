import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._image = document
      .querySelector(".popup_type_image")
      .querySelector(".popup__image");
    this._title = document
      .querySelector(".popup_type_image")
      .querySelector(".popup__title");
  }

  open(name, link) {
    super.open();
    this._image.alt = name;
    this._image.src = link;
    this._title.textContent = name;
  }
}
