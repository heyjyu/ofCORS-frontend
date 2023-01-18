import { apiService } from '../services/ApiService';

import Store from './Store';

export default class ProfileEditFormStore extends Store {
  constructor() {
    super();

    this.errorMessages = {
      displayName: {
        empty: '닉네임을 입력해주세요',
        invalid: '닉네임을 다시 확인해주세요',
      },
      tag: {
        empty: '태그를 입력해주세요',
      },
    };

    this.patterns = {
      displayName: /^.{3,}$/,
    };

    this.reset();
  }

  fillFields(user) {
    this.tags = new Set([...user.tags].map((tag) => tag.name));
    this.fields = {
      displayName: user.displayName,
      about: user.about,
      imageUrl: user.imageUrl,
    };

    this.publish();
  }

  changeDisplayName(displayName) {
    this.fields.displayName = displayName;
    this.validateDisplayName();

    this.publish();
  }

  changeAbout(about) {
    this.fields.about = about;

    this.publish();
  }

  changeTag(tag) {
    this.fields.tag = tag;

    this.publish();
  }

  async changeImage(imageFile) {
    const imageUrl = await apiService.upload(imageFile);

    this.fields.imageUrl = imageUrl;
    this.publish();
  }

  addTag() {
    this.validateTag();

    if (!this.errors.tag) {
      this.tags.add(this.fields.tag);
    }

    this.publish();
  }

  removeTag(tag) {
    this.tags.delete(tag);

    this.publish();
  }

  reset() {
    this.fields = {};
    this.errors = {};
    this.tags = new Set();

    this.publish();
  }

  validate() {
    this.validateDisplayName();

    this.publish();
  }

  validateDisplayName() {
    if (!this.fields.displayName?.length) {
      this.errors.displayName = this.errorMessages.displayName.empty;

      return;
    }

    if (!this.patterns.displayName.test(this.fields.displayName)) {
      this.errors.displayName = this.errorMessages.displayName.invalid;

      return;
    }

    this.errors.displayName = '';
  }

  validateTag() {
    if (!this.fields.tag?.length) {
      this.errors.tag = this.errorMessages.tag.empty;

      return;
    }

    this.errors.tag = '';
  }

  get isValidateSuccessful() {
    return !Object.values(this.errors).some((error) => error);
  }
}

export const profileEditFormStore = new ProfileEditFormStore();
