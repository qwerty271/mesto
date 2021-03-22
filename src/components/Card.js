export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    confirmDelete,
    handleLikeCard
    //TEST
    // user
    //TEST
  ) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._element = this._getTemplate();
    this._handleCardClick = handleCardClick;
    this._cardImage = this._element.querySelector(".element__image");
    this._likeButton = this._element.querySelector(".element__like");
    this._confirmDelete = confirmDelete;
    this._handleLikeCard = handleLikeCard;
    //TEST
    // this._userData = user;
    //TEST
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  } //Клонирование Template

  renderCard() {
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".element__place").textContent = this._name;
    this._element.querySelector(
      ".element__counter"
    ).textContent = this._likes.length;

    //TEST
    // this._likesArray = Array.from(this._likes).map((item) => {
    //   return item._id;
    // });

    // if (this._likesArray.includes(this._userData._id)) {
    //   this._likeButton.classList.add("element__like_active");
    // } else {
    //   this._likeButton.classList.remove("element__like_active");
    // }
    //TEST

    return this._element;
  } //Генерация карточки

  // _handleLikeCard() {
  //   this._likeButton.classList.toggle("element__like_active");
  //   if (this._element.querySelector(".element__like_active")) {
  //     this._likes.length - 1;
  //   } else {
  //     this._likes.length + 1;
  //   }
  // } //Лайк карточки

  _setEventListeners() {
    this._element.addEventListener("click", (event) => {
      const card = event.target.closest(".element");
      const target = event.target;
      if (target.classList != "element__delete") return;
      if (card) {
        event.preventDefault();
        this._confirmDelete(card, this._cardId);
        // card.remove();
      }
    }); //Удаление карточки

    this._likeButton.addEventListener("click", () => {
      this._handleLikeCard(this._element, this._cardId, this._likes);
    }); //Слушатель на кнопку лайка

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    }); //Открытие карточки
  }
}
