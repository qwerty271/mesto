let openButton = document.querySelector(".profile__edit");
let overlay = document.querySelector(".overlay");
let closeButton = overlay.querySelector(".overlay__button");
let nameInput = overlay.querySelector(".form__name");
let jobInput = overlay.querySelector(".form__job");
let nameValue = document.querySelector(".profile__name");
let jobValue = document.querySelector(".profile__about");

openButton.addEventListener("click", () => {
  overlay.classList.add("overlay_active");
});
closeButton.addEventListener("click", () => {
  overlay.classList.remove("overlay_active");
});
overlay.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    overlay.classList.remove("overlay_active");
  }
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameValue.textContent = nameInput.value;
  jobValue.textContent = jobInput.value;
  overlay.classList.remove("overlay_active");
}
let form = overlay.querySelector(".form");
form.addEventListener("submit", handleFormSubmit);
