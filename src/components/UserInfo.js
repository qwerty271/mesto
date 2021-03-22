export default class UserInfo {
  constructor(userInfoSelector) {
    this._name = userInfoSelector.name;
    this._about = userInfoSelector.about;
    this._avatar = userInfoSelector.avatar;
  }

  getUserInfo() {
    const dataUser = {
      name: this._name.textContent,
      about: this._about.textContent,
    };
    return dataUser;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    if (data.avatar) {
      this._avatar.src = data.avatar;
    }

    //TEST
    // this._userData = data;
    //TEST
  }

  //TEST
  // getUserData() {
  //   console.log(this._userData);
  //   return this._userData;
  // }
  //TEST
}
