import { apiService } from '../services/ApiService';

import Store from './Store';

export default class SignUpFormStore extends Store {
  constructor() {
    super();

    this.errorMessages = {
      displayName: {
        empty: '닉네임을 입력해주세요',
        invalid: '닉네임을 다시 확인해주세요',
      },
      email: {
        empty: '이메일을 입력해주세요',
        invalid: '이메일을 다시 확인해주세요',
        taken: '해당 이메일은 사용할 수 없습니다',
      },
      password: {
        empty: '비밀번호를 입력해주세요',
        invalid: '비밀번호를 다시 확인해주세요',
      },
      passwordCheck: {
        empty: '비밀번호를 입력해주세요',
        unmatched: '비밀번호가 일치하지 않습니다',
      },
    };

    this.patterns = {
      displayName: /^.{3,}$/,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    };

    this.reset();
  }

  changeDisplayName(displayName) {
    this.fields.displayName = displayName;
    this.validateDisplayName();

    this.publish();
  }

  changeEmail(email) {
    this.fields.email = email;

    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(async () => {
      await this.validateEmail();

      this.publish();
    }, 500);

    this.publish();
  }

  changePassword(password) {
    this.fields.password = password;
    this.validatePassword();

    this.publish();
  }

  changePasswordCheck(passwordCheck) {
    this.fields.passwordCheck = passwordCheck;
    this.validatePasswordCheck();

    this.publish();
  }

  reset() {
    this.fields = {};
    this.errors = {};
    this.timer = null;

    this.publish();
  }

  async validate() {
    this.validateDisplayName();
    await this.validateEmail();
    this.validatePassword();
    this.validatePasswordCheck();

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

  async validateEmail() {
    if (!this.fields.email?.length) {
      this.errors.email = this.errorMessages.email.empty;

      return;
    }

    if (!this.patterns.email.test(this.fields.email)) {
      this.errors.email = this.errorMessages.email.invalid;

      return;
    }

    const count = await apiService.countUser(this.fields.email);

    if (count !== 0) {
      this.errors.email = this.errorMessages.email.taken;

      return;
    }

    this.errors.email = '';
  }

  validatePassword() {
    if (!this.fields.password?.length) {
      this.errors.password = this.errorMessages.password.empty;

      return;
    }

    if (!this.patterns.password.test(this.fields.password)) {
      this.errors.password = this.errorMessages.password.invalid;

      return;
    }

    this.errors.password = '';
  }

  validatePasswordCheck() {
    if (!this.fields.passwordCheck?.length) {
      this.errors.passwordCheck = this.errorMessages.passwordCheck.empty;

      return;
    }

    if (this.fields.passwordCheck !== this.fields.password) {
      this.errors.passwordCheck = this.errorMessages.passwordCheck.unmatched;

      return;
    }

    this.errors.passwordCheck = '';
  }

  get isValidateSuccessful() {
    return !Object.values(this.errors).some((error) => error);
  }
}

export const signUpFormStore = new SignUpFormStore();
