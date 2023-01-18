import { apiService } from '../services/ApiService';

import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.signUpStatus = '';
    this.loginStatus = '';
    this.editStatus = '';
    this.users = [];
    this.user = null;
    this.keyword = '';
    this.searching = false;
    this.isUsersLoading = false;
    this.isUserLoading = false;
    this.isEditing = false;
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

  async fetchMe() {
    const user = await apiService.fetchMe();

    this.user = user;

    this.publish();
  }

  async editProfile({
    displayName,
    about,
    imageUrl,
    tags,
  }) {
    this.startEdit();

    try {
      await apiService.editProfile({
        displayName,
        about,
        imageUrl,
        tags,
      });

      this.completeEdit();
    } catch (e) {
      this.failEdit();
    }
  }

  changeKeyword(keyword) {
    this.keyword = keyword;

    this.publish();
  }

  async fetchUsers({ sort, keyword = '' }) {
    this.startUsersLoad();

    try {
      const { users } = await apiService.fetchUsers({ sort, keyword });

      this.completeUsersLoad(users, keyword);
    } catch (e) {
      this.failUsersLoad();
    }
  }

  async fetchUser(id) {
    this.startUserLoad();

    try {
      const user = await apiService.fetchUser(id);

      this.completeUserLoad(user);
    } catch (e) {
      this.failUserLoad();
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

  changeEditStatus(status) {
    this.editStatus = status;
    this.publish();
  }

  resetEditStatus() {
    this.editStatus = '';
    this.publish();
  }

  startUsersLoad() {
    this.isUsersLoading = true;
    this.users = [];
    this.publish();
  }

  completeUsersLoad(users, keyword) {
    if (keyword) {
      this.searching = true;
    }

    if (!keyword) {
      this.searching = false;
    }

    this.isUsersLoading = false;
    this.users = users;
    this.publish();
  }

  failUsersLoad() {
    this.isUsersLoading = false;
    this.users = [];
    this.publish();
  }

  startUserLoad() {
    this.isUserLoading = true;
    this.user = null;
    this.publish();
  }

  completeUserLoad(user) {
    this.isUserLoading = false;
    this.user = user;
    this.publish();
  }

  failUserLoad() {
    this.isUserLoading = false;
    this.user = null;
    this.publish();
  }

  startEdit() {
    this.isEditing = true;
    this.changeEditStatus('processing');
    this.publish();
  }

  completeEdit() {
    this.isEditing = false;
    this.changeEditStatus('successful');
    this.publish();
  }

  failEdit() {
    this.isEditing = false;
    this.changeEditStatus('failed');
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

  get isEditSuccessful() {
    return this.editStatus === 'successful';
  }

  get isEditFailed() {
    return this.editStatus === 'failed';
  }
}

export const userStore = new UserStore();
