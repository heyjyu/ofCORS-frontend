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

  changeSignUpStatus(status) {
    this.fields.signUpStatus = status;
    this.publish();
  }

  resetSignUpStatus() {
    this.fields.signUpStatus = '';
    this.publish();
  }

  get isSignUpSuccessful() {
    return this.fields.signUpStatus === 'successful';
  }

  get isSignUpFailed() {
    return this.fields.signUpStatus === 'failed';
  }
}

export const userStore = new UserStore();
