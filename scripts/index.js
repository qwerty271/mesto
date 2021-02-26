import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
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

function openPopup(target) {
  target.classList.add("popup_is_opened");
  document.addEventListener("keydown", closePopupEscape);
}

function closePopup(target) {
  target.classList.remove("popup_is_opened");
  document.removeEventListener("keydown", closePopupEscape);
}

popupEdit.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closePopup(popupEdit);
  }
});

popupCard.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closePopup(popupCard);
  }
});

popupImage.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closePopup(popupImage);
  }
});

openEdit.addEventListener("click", () => {
  openPopup(popupEdit);
  nameInput.value = nameValue.textContent;
  jobInput.value = jobValue.textContent;
  editFormValidator.resetError();
});

openCard.addEventListener("click", () => {
  openPopup(popupCard);
  cardFormValidator.resetError();
  formCard.reset();
});

closeEdit.addEventListener("click", () => {
  closePopup(popupEdit);
});

closeCard.addEventListener("click", () => {
  closePopup(popupCard);
});

closeImage.addEventListener("click", () => {
  closePopup(popupImage);
});

closeImage.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closePopup(popupImage);
  }
});

function closePopupEscape(evt) {
  const popupIsOpened = document.querySelector(".popup_is_opened");
  if (evt.key === "Escape") {
    closePopup(popupIsOpened);
  }
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  nameValue.textContent = nameInput.value;
  jobValue.textContent = jobInput.value;
  closePopup(popupEdit);
}

formEdit.addEventListener("submit", handleFormEditSubmit);
formCard.addEventListener("submit", handleFormCardSubmit);

function handleFormCardSubmit(evt) {
  const cardValue = {
    name: titleInput.value,
    link: linkInput.value,
  };
  evt.preventDefault();
  closePopup(popupCard);
  elements.prepend(createCard(cardValue));
  formCard.reset();
}

function handleCardClick(name, link) {
  image.src = link;
  image.alt = name;
  title.textContent = name;
  openPopup(popupImage);
}
function createCard(data) {
  const card = new Card(data, ".template", handleCardClick);
  const cardElement = card.renderCard();
  return cardElement;
}

initialCards.forEach((item) => {
  elements.prepend(createCard(item));
});

function formValidate(form) {
  const formValidator = new FormValidator(configValidation, form);
  formValidator.enableValidation();
  return formValidator;
}
