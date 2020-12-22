let openButton = document.querySelector(".profile__edit");
let overlay = document.querySelector(".overlay");
let closeButton = overlay.querySelector(".overlay__button");
function toggleForm() {
  overlay.classList.toggle("overlay_active");
}
openButton.addEventListener("click", toggleForm);
closeButton.addEventListener("click", toggleForm);
overlay.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    toggleForm();
  }
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  let nameInput = overlay.querySelector(".form__item_name");
  let jobInput = overlay.querySelector(".form__item_job");
  let nameValue = document.querySelector(".profile__info_name");
  let jobValue = document.querySelector(".profile__info_about");
  nameValue.textContent = nameInput.value;
  jobValue.textContent = jobInput.value;
}
let form = overlay.querySelector(".form");
form.addEventListener("submit", handleFormSubmit);
let submitButton = overlay.querySelector(".form__button");
submitButton.addEventListener("click", () => {
  overlay.classList.remove("overlay_active");
});
