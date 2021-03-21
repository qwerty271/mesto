export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._token = options.headers.authorization;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  getAllData() {
    return Promise.all([this.getInitialCards(), this.getUser()]);
  }

  like(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  removeLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId} `, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  replaceUser(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  replaceAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }

  addCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }
}
