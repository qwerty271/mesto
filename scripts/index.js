const popupEdit = document.querySelector(".popup_type_edit");
const popupCard = document.querySelector(".popup_type_card");
const popupImage = document.querySelector(".popup_type_image");
const popup = document.querySelector(".popup");
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
const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function openPopup(target) {
  target.classList.add("popup_is_opened");
  resetError(target, configValidation);
}

function closePopup(target) {
  target.classList.remove("popup_is_opened");
}

popupEdit.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    closePopup(popupEdit);
  }
});

popupCard.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    formCard.reset(); //??????????????????????????
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
});

openCard.addEventListener("click", () => {
  openPopup(popupCard);
});

closeEdit.addEventListener("click", () => {
  closePopup(popupEdit);
});

closeCard.addEventListener("click", () => {
  formCard.reset(); //???????????????????????
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
  evt.preventDefault();
  closePopup(popupCard);
  renderCard(true);
}

formEdit.addEventListener("submit", handleFormEditSubmit);
formCard.addEventListener("submit", handleFormCardSubmit);

function render() {
  initialCards.forEach(renderCard);
}

function renderCard(data) {
  const htmlElement = template.cloneNode(true);
  const elementImage = htmlElement.querySelector(".element__image");
  elementImage.src = data.link || linkInput.value;
  elementImage.alt = data.name || titleInput.value;
  htmlElement.querySelector(".element__place").textContent =
    data.name || titleInput.value;
  elements.prepend(htmlElement);
  formCard.reset();
}

elements.addEventListener("click", (event) => {
  const card = event.target.closest(".element");
  const target = event.target;
  if (target.classList != "element__delete") return;
  if (card) {
    card.remove();
  }
});

elements.onclick = function (event) {
  const target = event.target;
  if (target.id != "like") return;
  target.classList.toggle("element__like_active");
};

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

function closePopupEscape() {
  const popupList = Array.from(document.querySelectorAll(".popup"));
  popupList.forEach((popupElement) => {
    document.addEventListener("keydown", function (evt) {
      if (evt.key === "Escape") {
        closePopup(popupElement);
      }
    });
  });
}

closePopupEscape();
