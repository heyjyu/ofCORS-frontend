import Store from './Store';

export default class AnswerFormStore extends Store {
  constructor() {
    super();

    this.errorMessages = {
      body: {
        empty: '내용을 입력해주세요',
      },
    };

    this.reset();
  }

  changeBody(body) {
    this.fields.body = body;
    this.validateBody();

    this.publish();
  }

  reset() {
    this.fields = {};
    this.errors = {};

    this.publish();
  }

  validate() {
    this.validateBody();

    this.publish();
  }

  validateBody() {
    if (!this.fields.body?.length) {
      this.errors.body = this.errorMessages.body.empty;

      return;
    }

    this.errors.body = '';
  }

  get isValidateSuccessful() {
    return !Object.values(this.errors).some((error) => error);
  }
}

export const answerFormStore = new AnswerFormStore();
