import { apiService } from '../services/ApiService';
import Store from './Store';

export default class SelectAnswerFormStore extends Store {
  constructor() {
    super();

    this.errorMessages = {
      points: {
        notEnough: '보유 포인트보다 많은 포인트를 입력하셨습니다',
      },
    };

    this.reset();
  }

  selectAnswerId(id) {
    this.selectedAnswerId = id;

    this.publish();
  }

  async fetchPoints() {
    const { points } = await apiService.fetchMe();

    this.points = points;

    this.publish();
  }

  changePoints(points) {
    this.fields.points = points;
    this.validatePoints();

    this.publish();
  }

  changeMessage(message) {
    this.fields.message = message;

    this.publish();
  }

  reset() {
    this.fields = {};
    this.errors = {};

    this.publish();
  }

  async validate() {
    await this.validatePoints();

    this.publish();
  }

  async validatePoints() {
    await this.fetchPoints();
    if (this.fields.points > this.points) {
      this.errors.points = this.errorMessages.points.notEnough;

      return;
    }

    this.errors.points = '';
  }

  get isValidateSuccessful() {
    return !Object.values(this.errors).some((error) => error);
  }
}

export const selectAnswerFormStore = new SelectAnswerFormStore();
