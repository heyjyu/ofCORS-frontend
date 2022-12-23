import { apiService } from '../services/ApiService';

import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.signUpStatus = '';
    this.loginStatus = '';
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
    this.signUpStatus = status;
    this.publish();
  }

  resetSignUpStatus() {
    this.signUpStatus = '';
    this.publish();
  }

  changeLoginStatus(status) {
    this.loginStatus = status;
    this.publish();
  }

  resetLoginStatus() {
    this.loginStatus = '';
    this.publish();
  }

  get isSignUpSuccessful() {
    return this.signUpStatus === 'successful';
  }

  get isSignUpFailed() {
    return this.signUpStatus === 'failed';
  }

  get isLoginSuccessful() {
    return this.loginStatus === 'successful';
  }

  get isLoginFailed() {
    return this.loginStatus === 'failed';
  }
}

export const userStore = new UserStore();
