const popupEdit = document.querySelector(".popup_type_edit");
const popupCard = document.querySelector(".popup_type_card");
const popupImage = document.querySelector(".popup_type_image");
const image = popupImage.querySelector(".popup__image");
const title = popupImage.querySelector(".popup__title");
const openEdit = document.querySelector(".profile__edit");
const openCard = document.querySelector(".profile__add");
const closeEdit = popupEdit.querySelector(".popup__button");
const closeCard = popupCard.querySelector(".popup__button");
const closeImage = popupImage.querySelector(".popup__button");
const formEdit = popupEdit.querySelector(".form");
const formCard = popupCard.querySelector(".form");
const formButtonEdit = popupEdit.querySelector(".form__button");
const formButtonCard = popupCard.querySelector(".form__button");
const nameInput = popupEdit.querySelector(".form__item_type_name");
const jobInput = popupEdit.querySelector(".form__item_type_job");
const nameValue = document.querySelector(".profile__name");
const jobValue = document.querySelector(".profile__about");
const form = document.querySelector(".form");
const titleInput = popupCard.querySelector(".form__item_type_title");
const linkInput = popupCard.querySelector(".form__item_type_link");
const elements = document.querySelector(".elements");
const elementImage = elements.querySelector(".element__image");
const template = document.querySelector(".template").content;

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
  resetError(popupEdit, configValidation);
});

openCard.addEventListener("click", () => {
  openPopup(popupCard);
  resetError(popupCard, configValidation);
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

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  nameValue.textContent = nameInput.value;
  jobValue.textContent = jobInput.value;
  closePopup(popupEdit);
}

function handleFormCardSubmit(evt) {
  const cardValue = {
    name: titleInput.value,
    link: linkInput.value,
  };
  evt.preventDefault();
  closePopup(popupCard);
  renderCard(cardValue);
  formCard.reset();
}

formEdit.addEventListener("submit", handleFormEditSubmit);
formCard.addEventListener("submit", handleFormCardSubmit);

function render() {
  initialCards.forEach(renderCard);
}

function renderCard(data) {
  elements.prepend(createCard(data));
}

function createCard(data) {
  const templateElement = template.cloneNode(true);
  const elementImage = templateElement.querySelector(".element__image");
  elementImage.src = data.link;
  elementImage.alt = data.name;
  templateElement.querySelector(".element__place").textContent = data.name;
  return templateElement;
}

elements.addEventListener("click", (event) => {
  const card = event.target.closest(".element");
  const target = event.target;
  if (target.classList != "element__delete") return;
  if (card) {
    card.remove();
  }
});

elements.addEventListener("click", (event) => {
  const target = event.target;
  if (target.id != "like") return;
  target.classList.toggle("element__like_active");
});

elements.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList != "element__image") return;
  openPopup(popupImage);
  image.src = target.src;
  image.alt = target.alt;
  title.textContent = target.alt;
});

closeImage.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closePopup(popupImage);
  }
});

render();

// function addClosePopupEscape() {
//   const popupList = Array.from(document.querySelectorAll(".popup"));
//   popupList.forEach((popupElement) => {
//     document.addEventListener("keydown", function (evt) {
//       if (evt.key === "Escape") {
//         closePopup(popupElement);
//       }
//     });
//   });
// }

// function removeClosePopupEscape() {
//   const popupList = Array.from(document.querySelectorAll(".popup"));
//   popupList.forEach((popupElement) => {
//     document.removeEventListener("keydown", function (evt) {
//       if (evt.key === "Escape") {
//         closePopup(popupElement);
//       }
//     });
//   });
// }

function closePopupEscape(evt) {
  const popupIsOpened = document.querySelector(".popup_is_opened");
  if (evt.key === "Escape") {
    closePopup(popupIsOpened);
  }
}
