const openButton = document.querySelector(".profile__edit");
const overlay = document.querySelector(".overlay");
const closeButton = overlay.querySelector(".overlay__button");
const nameInput = overlay.querySelector(".form__item_type_name");
const jobInput = overlay.querySelector(".form__item_type_job");
const nameValue = document.querySelector(".profile__name");
const jobValue = document.querySelector(".profile__about");
const formOverlay = overlay.querySelector(".form");
const openPopup = document.querySelector(".profile__add");
const blackout = document.querySelector(".blackout");
const closePopup = blackout.querySelector(".blackout__button");
const formBlackout = blackout.querySelector(".form");
const titleInput = blackout.querySelector(".form__item_type_title");
const linkInput = blackout.querySelector(".form__item_type_link");
const elements = document.querySelector(".elements");
const increase = document.querySelector(".increase");
const increaseImage = increase.querySelector(".increase__image");
const imgTitle = increase.querySelector(".increase__title");
const elementImage = elements.querySelector(".element__image");
const increaseClose = document.querySelector(".increase__button");
const template = document.querySelector(".template").content;
const formButton = blackout.querySelector(".form__button");
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

function overlayAdd(element) {
  if (element === overlay) {
    overlay.classList.add("overlay_active");
    nameInput.value = nameValue.textContent;
    jobInput.value = jobValue.textContent;
  }
  if (element === blackout) {
    blackout.classList.add("blackout_active");
  }
  if (element === increase) {
    increase.classList.add("increase_active");
  }
}

function overlayRemove(element) {
  if (element === overlay) {
    overlay.classList.remove("overlay_active");
  }
  if (element === blackout) {
    blackout.classList.remove("blackout_active");
  }
}

overlay.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    overlay.classList.remove("overlay_active");
  }
});

blackout.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    blackout.classList.remove("blackout_active");
  }
});

function handleFormOverlaySubmit(evt) {
  evt.preventDefault();
  nameValue.textContent = nameInput.value;
  jobValue.textContent = jobInput.value;
  overlayRemove(overlay);
}

function handleFormBlackoutSubmit(evt) {
  evt.preventDefault();
  overlayRemove(blackout);
}

openButton.addEventListener("click", () => {
  overlayAdd(overlay);
});

openPopup.addEventListener("click", () => {
  overlayAdd(blackout);
});

closeButton.addEventListener("click", () => {
  overlayRemove(overlay);
});

closePopup.addEventListener("click", () => {
  overlayRemove(blackout);
});

formOverlay.addEventListener("submit", handleFormOverlaySubmit);
formBlackout.addEventListener("submit", handleFormBlackoutSubmit);

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
  linkInput.value = "";
  titleInput.value = "";
}

function cardSubmit() {
  renderCard(true);
}

formButton.addEventListener("click", cardSubmit);

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
  overlayAdd(increase);
  increaseImage.src = target.src;
  increaseImage.alt = target.alt;
  imgTitle.textContent = target.alt;
});

increaseClose.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    increase.classList.remove("increase_active");
  }
});

render();
