export default class Section {
  constructor({ renderer }, containerSelector) {
    // this._initialCards = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // renderItems() {
  //   this._initialCards.forEach((item) => {
  //     this._renderer(item);
  //   });
  // }

  renderItems(array) {
    array.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
