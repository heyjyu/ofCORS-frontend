import Store from './Store';

export default class VerifyUserFormStore extends Store {
  constructor() {
    super();

    this.errorMessages = {
      name: {
        empty: '이름을 입력해주세요',
      },
      phoneNumber: {
        empty: '전화번호를 입력해주세요',
      },
    };

    this.reset();
  }

  changeName(name) {
    this.fields.name = name;
    this.validateName();

    this.publish();
  }

  changePhoneNumber(phoneNumber) {
    this.fields.phoneNumber = phoneNumber;
    this.validatePhoneNumber();

    this.publish();
  }

  reset() {
    this.fields = {};
    this.errors = {};

    this.publish();
  }

  async validate() {
    this.validateName();
    this.validatePhoneNumber();

    this.publish();
  }

  validateName() {
    if (!this.fields.name?.length) {
      this.errors.name = this.errorMessages.name.empty;

      return;
    }

    this.errors.name = '';
  }

  validatePhoneNumber() {
    if (!this.fields.phoneNumber?.length) {
      this.errors.phoneNumber = this.errorMessages.phoneNumber.empty;

      return;
    }

    this.errors.phoneNumber = '';
  }

  get isValidateSuccessful() {
    return !Object.values(this.errors).some((error) => error);
  }
}

export const verifyUserFormStore = new VerifyUserFormStore();
