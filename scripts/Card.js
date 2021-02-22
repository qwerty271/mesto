export default class Card {
  constructor(data, templateSelector) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._elements = document.querySelector(".elements");
    this._title = document
      .querySelector(".popup_type_image")
      .querySelector(".popup__title");
    this._image = document
      .querySelector(".popup_type_image")
      .querySelector(".popup__image");
    this._popupImage = document.querySelector(".popup_type_image");
    this._cardCloseButton = document
      .querySelector(".popup_type_image")
      .querySelector(".popup__button");
    this._formCard = document
      .querySelector(".popup_type_card")
      .querySelector(".form");
    this._titleInput = document
      .querySelector(".popup_type_card")
      .querySelector(".form__item_type_title").value;
    this._linkInput = document
      .querySelector(".popup_type_card")
      .querySelector(".form__item_type_link").value;
    this._element = this._getTemplate();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  } //Клонирование Template

  createCard() {
    this._setEventListeners();
    this._element.querySelector(".element__image").src =
      this._link || this._linkInput;
    this._element.querySelector(".element__image").alt =
      this._name || this._titleInput;
    this._element.querySelector(".element__place").textContent =
      this._name || this._titleInput;
    return this._element;
  } //Генерация карточки

  _handleOpenPopup = () => {
    this._popupImage.classList.add("popup_is_opened");
    document.addEventListener("keydown", this._closeCardPopupEscape);
  }; //Открытие попапа

  _handleClosePopup = () => {
    this._popupImage.classList.remove("popup_is_opened");
    document.removeEventListener("keydown", this._closeCardPopupEscape);
  }; //Закрытие попапа

  _closeCardPopupEscape = (evt) => {
    if (evt.key === "Escape") {
      this._handleClosePopup();
    }
  }; //Закрытие по ESC

  _handleLikeCard = () => {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }; //Лайк карточки

  _setEventListeners() {
    this._cardCloseButton.addEventListener("click", () => {
      this._handleClosePopup();
    }); //Закрытие открытой картинки

    this._elements.addEventListener("click", (event) => {
      const target = event.target;
      if (target.classList != "element__image") return;
      this._handleOpenPopup();
      this._image.src = target.src;
      this._image.alt = target.alt;
      this._title.textContent = target.alt;
    }); //Открытие картинки

    this._elements.addEventListener("click", (event) => {
      const card = event.target.closest(".element");
      const target = event.target;
      if (target.classList != "element__delete") return;
      if (card) {
        card.remove();
      }
    }); //Удаление карточки

    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._handleLikeCard();
      }); //Слушатель на кнопку лайка
  }
}
