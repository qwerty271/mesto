export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    // this._elements = document.querySelector(".elements");
    // this._title = document
    //   .querySelector(".popup_type_image")
    //   .querySelector(".popup__title");
    // this._image = document
    //   .querySelector(".popup_type_image")
    //   .querySelector(".popup__image");
    // this._popupImage = document.querySelector(".popup_type_image");
    // this._cardCloseButton = document
    //   .querySelector(".popup_type_image")
    //   .querySelector(".popup__button");
    // this._formCard = document
    //   .querySelector(".popup_type_card")
    //   .querySelector(".form");
    // this._titleInput = document
    //   .querySelector(".popup_type_card")
    //   .querySelector(".form__item_type_title").value;
    // this._linkInput = document
    //   .querySelector(".popup_type_card")
    //   .querySelector(".form__item_type_link").value;
    this._link = data.link;
    this._name = data.name;
    this._element = this._getTemplate();
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._cardImage = this._element.querySelector(".element__image");
    this._likeButton = this._element.querySelector(".element__like");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(".template")
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  } //Клонирование Template

  renderCard() {
    this._setEventListeners();
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__place").textContent = this._name;
    return this._element;
  } //Генерация карточки

  _handleLikeCard = () => {
    this._likeButton.classList.toggle("element__like_active");
  }; //Лайк карточки

  _setEventListeners() {
    this._element.addEventListener("click", (event) => {
      const card = event.target.closest(".element");
      const target = event.target;
      if (target.classList != "element__delete") return;
      if (card) {
        card.remove();
      }
    }); //Удаление карточки

    this._likeButton.addEventListener("click", () => {
      this._handleLikeCard();
    }); //Слушатель на кнопку лайка

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    }); //Открытие карточки
  }
}
