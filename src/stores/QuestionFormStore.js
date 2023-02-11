import { apiService } from '../services/ApiService';

import Store from './Store';

export default class QuestionFormStore extends Store {
  constructor() {
    super();

    this.errorMessages = {
      title: {
        empty: '제목을 입력해주세요',
      },
      body: {
        empty: '상황을 설명해주세요',
      },
      tag: {
        empty: '태그를 입력해주세요',
      },
      points: {
        notEnough: '보유 포인트보다 많은 포인트를 입력하셨습니다',
      },
    };

    this.reset();
  }

  changeTitle(title) {
    this.fields.title = title;
    this.validateTitle();
    this.validateBody();

    this.publish();
  }

  changeBody(body) {
    this.fields.body = body;
    this.validateBody();
    this.validateTitle();

    this.publish();
  }

  changeTag(tag) {
    this.fields.tag = tag;

    this.publish();
  }

  changePoints(points) {
    this.fields.points = points;
    this.validatePoints();

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

  async fetchPoints() {
    const { points } = await apiService.fetchMe();

    this.points = points;

    this.publish();
  }

  fillFields(question) {
    this.tags = new Set([...question.tags].map((tag) => tag.name));
    this.fields = {
      title: question.title,
      body: question.body,
    };

    this.publish();
  }

  reset() {
    this.fields = {};
    this.errors = {};
    this.tags = new Set();
    this.points = 0;

    this.publish();
  }

  async validate() {
    this.validateTitle();
    this.validateBody();
    await this.validatePoints();

    this.publish();
  }

  validateTitle() {
    if (!this.fields.title?.length) {
      this.errors.title = this.errorMessages.title.empty;

      return;
    }

    this.errors.title = '';
  }

  validateBody() {
    if (!this.fields.body?.length) {
      this.errors.body = this.errorMessages.body.empty;

      return;
    }

    this.errors.body = '';
  }

  async validatePoints() {
    await this.fetchPoints();
    if (this.fields.points > this.points) {
      this.errors.points = this.errorMessages.points.notEnough;

      return;
    }

    this.errors.points = '';
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

export const questionFormStore = new QuestionFormStore();
