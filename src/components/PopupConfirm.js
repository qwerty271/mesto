import Popup from "./Popup.js";
export default class PopupConfirm extends Popup {
  constructor(popupSelector, setSubmitAction) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(".form");
    this._setSubmitAction = setSubmitAction;
  }

  open(data, cardId) {
    super.open();
    this.data = data;
    this.cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this._setSubmitAction(this.data, this.cardId);
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
