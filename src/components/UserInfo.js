export default class UserInfo {
  constructor({userSelector, jobSelector}) {
    this._userName = document.querySelector(userSelector);
    this._userJob = document.querySelector(jobSelector);
  }


  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent
    };
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.job;
  }
}
