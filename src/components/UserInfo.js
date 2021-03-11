export default class UserInfo {
  constructor(userInfoSelector) {
    this._name = userInfoSelector.name;
    this._info = userInfoSelector.info;
  }

  getUserInfo() {
    const dataUser = {
      name: this._name.textContent,
      info: this._info.textContent,
    };
    return dataUser;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._info.textContent = data.info;
  }
}
