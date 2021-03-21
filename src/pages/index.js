import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirm from "../components/PopupConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "../pages/index.css";

const popupEdit = document.querySelector(".popup_type_edit");
const popupCard = document.querySelector(".popup_type_card");
const popupImage = document.querySelector(".popup_type_image");
const popupAvatar = document.querySelector(".popup_type_avatar");
const openEdit = document.querySelector(".profile__edit");
const openCard = document.querySelector(".profile__add");
const openAvatar = document.querySelector(".profile__overlay");
const formEdit = popupEdit.querySelector(".form");
const formCard = popupCard.querySelector(".form");
const formAvatar = popupAvatar.querySelector(".form");
const nameInput = popupEdit.querySelector(".form__item_type_name");
const jobInput = popupEdit.querySelector(".form__item_type_job");
const nameValue = document.querySelector(".profile__name");
const jobValue = document.querySelector(".profile__about");
const image = popupImage.querySelector(".popup__image");
const title = popupImage.querySelector(".popup__title");
const avatar = document.querySelector(".profile__avatar");
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
const avatarFormValidator = formValidate(formAvatar);
const popupWithFormEdit = new PopupWithForm(
  ".popup_type_edit",
  handleFormEditSubmit
);
const popupWithFormCard = new PopupWithForm(
  ".popup_type_card",
  handleFormCardSubmit
);
const popupWithFormAvatar = new PopupWithForm(
  ".popup_type_avatar",
  handleFormAvatarSubmit
);
const popupWithImage = new PopupWithImage(".popup_type_image");
const popupConfirm = new PopupConfirm(".popup_type_confirm", setSubmitAction);
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-21",
  headers: {
    authorization: "4a2580e4-ef70-46aa-907f-36d56804716a",
    // "Content-Type": "application/json",
  },
});
const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  ".elements"
);
const userData = {
  name: nameValue,
  about: jobValue,
  avatar: avatar,
};
const userInfo = new UserInfo(userData);
let myId = {};

popupWithImage.setEventListeners();
popupWithFormCard.setEventListeners();
popupWithFormEdit.setEventListeners();
popupWithFormAvatar.setEventListeners();
popupConfirm.setEventListeners();

function handleCardClick(name, link) {
  image.src = link;
  image.alt = name;
  title.textContent = name;
  popupWithImage.open(name, link);
}

function createCard(data) {
  const card = new Card(
    data,
    ".template",
    handleCardClick,
    confirmDelete,
    handleLikeCard
  );
  const cardElement = card.renderCard();

  if (data.owner._id !== "cce7016d793ace25ba39718d") {
    cardElement.querySelector(".element__delete").remove();
  }

  if (typeof data.likes.find(filterById) === "object") {
    cardElement
      .querySelector(".element__like")
      .classList.add("element__like_active");
  }
  return cardElement;
}

function formValidate(form) {
  const formValidator = new FormValidator(configValidation, form);
  formValidator.enableValidation();
  return formValidator;
}

function handleFormCardSubmit(data) {
  popupCard.querySelector(".form__button").textContent = "Создание...";
  api
    .addCard(data.name, data.link)
    .then((res) => {
      // cardList.addItem(createCard(data));
      const array = [];
      array.push(res);
      cardList.renderItems(array);
      popupWithFormCard.close();
      popupCard.querySelector(".form__button").textContent = "Создать";
    })
    .catch((err) => {
      console.log(err);
    });
}

openCard.addEventListener("click", () => {
  popupWithFormCard.open();
  cardFormValidator.resetError();
});

function handleFormEditSubmit(data) {
  popupEdit.querySelector(".form__button").textContent = "Сохранение...";
  api
    .replaceUser(data.name, data.about)
    .then(() => {
      userInfo.setUserInfo(data);
      popupWithFormEdit.close();
      popupEdit.querySelector(".form__button").textContent = "Сохранить";
    })
    .catch((err) => {
      console.log(err);
    });
}

openEdit.addEventListener("click", (event) => {
  event.preventDefault();
  const userInfoData = userInfo.getUserInfo();
  nameInput.value = userInfoData.name;
  jobInput.value = userInfoData.about;
  popupWithFormEdit.open();
  editFormValidator.resetError();
});

function handleFormAvatarSubmit(data) {
  popupAvatar.querySelector(".form__button").textContent = "Сохранение...";
  api
    .replaceAvatar(data.avatar)
    .then(() => {
      document.querySelector(".profile__avatar").src = data.avatar;
      popupWithFormAvatar.close();
      popupAvatar.querySelector(".form__button").textContent = "Сохранить";
    })
    .catch((err) => {
      console.log(err);
    });
}

openAvatar.addEventListener("click", (event) => {
  event.preventDefault();
  popupWithFormAvatar.open();
  avatarFormValidator.resetError();
});

function confirmDelete(data, cardId) {
  popupConfirm.open(data, cardId);
}

function setSubmitAction(data, cardId) {
  api
    .removeCard(cardId)
    .then(() => {
      data.remove();
    })
    .catch((err) => {
      console.log(err);
    });
  popupConfirm.close();
}

api
  .getInitialCards()
  .then((data) => {
    cardList.renderItems(data);
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getUser()
  .then((user) => {
    myId = user;
    userInfo.setUserInfo(user);
  })
  .catch((err) => {
    console.log(err);
  });

function handleLikeCard(element, id, likes) {
  const numberOfLikes = element.querySelector(".element__counter");
  let likesArray = likes;
  if (typeof likesArray.find(filterById) === "object") {
    api
      .removeLike(id)
      .then((data) => {
        likesArray.splice(likesArray.indexOf(myId), 1);
        // likesArray.pop();
        numberOfLikes.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
    element
      .querySelector(".element__like")
      .classList.remove("element__like_active");
  } else if (typeof likesArray.find(filterById) === "undefined") {
    api
      .like(id)
      .then((data) => {
        likesArray.push(myId);
        numberOfLikes.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
    element
      .querySelector(".element__like")
      .classList.add("element__like_active");
  }
}
//////////////Проверка на наличие ID//////////////
function returnId(obj) {
  return obj._id === "cce7016d793ace25ba39718d";
}

function filterById(item) {
  if (returnId(item)) {
    return true;
  }
  return false;
}
//////////////Проверка на наличие ID//////////////

////test/////
// let post = {};
// function test() {
//   return fetch("https://mesto.nomoreparties.co/v1/cohort-21/cards", {
//     // method: "PUT",
//     headers: {
//       authorization: "4a2580e4-ef70-46aa-907f-36d56804716a",
//     },
//   })
//     .then((res) => res.json())
//     .then((result) => {
//       post = result;
//       console.log(post);
//     });
// }
// test();
////test/////
