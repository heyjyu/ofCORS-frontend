import { apiService } from '../services/ApiService';

import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.fields = {};
  }

  async signUp({
    displayName, email, password,
  }) {
    this.changeSignUpStatus('processing');

    try {
      const { id } = await apiService.createUser({
        displayName, email, password,
      });

      this.changeSignUpStatus('successful');

      return id;
    } catch {
      this.changeSignUpStatus('failed');

      return '';
    }
  }

  async login({ email, password }) {
    this.changeLoginStatus('processing');

    try {
      const { accessToken } = await apiService.postSession({ email, password });

      this.changeLoginStatus('successful');

      return accessToken;
    } catch {
      this.changeLoginStatus('failed');

      return '';
    }
  }

  changeSignUpStatus(status) {
    this.fields.signUpStatus = status;
    this.publish();
  }

  resetSignUpStatus() {
    this.fields.signUpStatus = '';
    this.publish();
  }

  changeLoginStatus(status) {
    this.fields.loginStatus = status;
    this.publish();
  }

  resetLoginStatus() {
    this.fields.loginStatus = '';
    this.publish();
  }

  get isSignUpSuccessful() {
    return this.fields.signUpStatus === 'successful';
  }

  get isSignUpFailed() {
    return this.fields.signUpStatus === 'failed';
  }

  get isLoginSuccessful() {
    return this.fields.loginStatus === 'successful';
  }

  get isLoginFailed() {
    return this.fields.loginStatus === 'failed';
  }
}

export const userStore = new UserStore();
