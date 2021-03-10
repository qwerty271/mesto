export default class UserInfo {
  constructor(userInfoSelector) {
    this._nameSelector = userInfoSelector.name;
    this._infoSelector = userInfoSelector.info;
  }

  getUserInfo() {
    const dataUser = {
      name: this._nameSelector.textContent,
      info: this._infoSelector.textContent,
    };
    return dataUser;
  }

  setUserInfo(data) {
    this._nameSelector.textContent = data.name;
    this._infoSelector.textContent = data.info;
  }
}
