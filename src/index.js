import Card from "./components/Card.js"; // ../
import FormValidator from "./components/FormValidator.js";
import Section from "./components/Section.js";
import Popup from "./components/Popup.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import { initialCards } from "./components/initial-сards.js";
import "./pages/index.css";
const popupEdit = document.querySelector(".popup_type_edit");
const popupCard = document.querySelector(".popup_type_card");
const popupImage = document.querySelector(".popup_type_image");
const openEdit = document.querySelector(".profile__edit");
const openCard = document.querySelector(".profile__add");
const closeEdit = popupEdit.querySelector(".popup__button");
const closeCard = popupCard.querySelector(".popup__button");
const formEdit = popupEdit.querySelector(".form");
const formCard = popupCard.querySelector(".form");
const nameInput = popupEdit.querySelector(".form__item_type_name");
const jobInput = popupEdit.querySelector(".form__item_type_job");
const nameValue = document.querySelector(".profile__name");
const jobValue = document.querySelector(".profile__about");
const elements = document.querySelector(".elements");
const titleInput = popupCard.querySelector(".form__item_type_title");
const linkInput = popupCard.querySelector(".form__item_type_link");
const image = popupImage.querySelector(".popup__image");
const title = popupImage.querySelector(".popup__title");
const closeImage = popupImage.querySelector(".popup__button");
const configValidation = {
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_inactive",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__item-error_active",
};
const editFormValidator = formValidate(formEdit);
const cardFormValidator = formValidate(formCard);
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, ".template", handleCardClick);
      const cardElement = card.renderCard();
      cardList.addItem(cardElement);
    },
  },
  ".elements"
);
const userData = {
  name: nameValue,
  info: jobValue,
};
const userInfo = new UserInfo(userData);
const popupWithFormEdit = new PopupWithForm(popupEdit, handleFormEditSubmit);
const popupWithFormCard = new PopupWithForm(popupCard, handleFormCardSubmit);

function handleCardClick(name, link) {
  const popupWithImage = new PopupWithImage(popupImage, name, link);
  image.src = link;
  image.alt = name;
  title.textContent = name;
  popupWithImage.open();
}

function createCard(data) {
  const card = new Card(data, ".template", handleCardClick);
  const cardElement = card.renderCard();
  return cardElement;
}

cardList.renderItems();

function formValidate(form) {
  const formValidator = new FormValidator(configValidation, form);
  formValidator.enableValidation();
  return formValidator;
}

function closePopupImage(popupSelector) {
  const popup = new PopupWithImage(popupSelector);
  popup.setEventListeners();
  return popup;
}

closePopupImage(popupImage);

popupWithFormCard.setEventListeners();
popupWithFormEdit.setEventListeners();

function handleFormCardSubmit(data) {
  elements.prepend(createCard(data));
  popupWithFormCard.close();
}

openCard.addEventListener("click", () => {
  popupWithFormCard.open();
  cardFormValidator.resetError();
  formCard.reset();
});

function handleFormEditSubmit(data) {
  userInfo.setUserInfo(data);
  popupWithFormEdit.close();
}

openEdit.addEventListener("click", (event) => {
  event.preventDefault();
  const userInfoData = userInfo.getUserInfo();
  nameInput.value = userInfoData.name;
  jobInput.value = userInfoData.info;
  popupWithFormEdit.open();
  editFormValidator.resetError();
});
