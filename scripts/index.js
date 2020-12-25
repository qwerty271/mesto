let openButton = document.querySelector(".profile__edit");
let overlay = document.querySelector(".overlay");
let closeButton = overlay.querySelector(".overlay__button");
let nameInput = overlay.querySelector(".form_item_type_name");
let jobInput = overlay.querySelector(".form_item_type_job");
let nameValue = document.querySelector(".profile__name");
let jobValue = document.querySelector(".profile__about");
let form = overlay.querySelector(".form");

function overlayAdd() {
  overlay.classList.add("overlay_active");
  nameInput.textContent = nameValue.value;
  jobInput.textContent = jobInput.value;
}
function overlayRemove() {
  overlay.classList.remove("overlay_active");
}
overlay.addEventListener("click", (event) => {
  if (event.target === event.currentTarget) {
    overlay.classList.remove("overlay_active");
  }
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameValue.textContent = nameInput.value;
  jobValue.textContent = jobInput.value;
  overlayRemove();
}
openButton.addEventListener("click", overlayAdd);
closeButton.addEventListener("click", overlayRemove);
form.addEventListener("submit", handleFormSubmit);
