export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._closeButton = this._popupSelector.querySelector(".popup__button");
    // this._popupEdit = document.querySelector(".popup_type_edit");
    // this._popupCard = document.querySelector(".popup_type_card");
    // this._popupImage = document.querySelector(".popup_type_image");
    // this._closeEdit = this._popupEdit.querySelector(".popup__button");
    // this._closeCard = this._popupCard.querySelector(".popup__button");
    // this._closeImage = this._popupImage.querySelector(".popup__button");
  }

  open() {
    this._popupSelector.classList.add("popup_is_opened");
    document.addEventListener("keydown", (event) => {
      this._handleEscClose(event);
    });
  }

  close() {
    this._popupSelector.classList.remove("popup_is_opened");
    document.removeEventListener("keydown", (event) => {
      this._handleEscClose(event);
    });
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener("click", (event) => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });

    this._closeButton.addEventListener("click", () => {
      this.close();
    });

    // this._popupEdit.addEventListener("click", (event) => {
    //   if (event.target === event.currentTarget) {
    //     this.close();
    //   }
    // });

    // this._popupCard.addEventListener("click", (event) => {
    //   if (event.target === event.currentTarget) {
    //     this.close();
    //   }
    // });

    // this._popupImage.addEventListener("click", (event) => {
    //   if (event.target === event.currentTarget) {
    //     this.close();
    //   }
    // });

    // this._closeEdit.addEventListener("click", () => {
    //   this.close();
    // });

    // this._closeCard.addEventListener("click", () => {
    //   this.close();
    // });

    // this._closeImage.addEventListener("click", () => {
    //   this.close();
    // });
  }
}
