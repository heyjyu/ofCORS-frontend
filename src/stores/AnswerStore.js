import { apiService } from '../services/ApiService';

import Store from './Store';

export default class AnswerStore extends Store {
  constructor() {
    super();

    this.reset();
  }

  async fetchAnswers({ questionId }) {
    this.startAnswersLoad();

    try {
      const { answers } = await apiService.fetchAnswers({ questionId });

      this.completeAnswersLoad(answers);
    } catch (e) {
      this.failAnswersLoad();
    }
  }

  async write({
    questionId, body,
  }) {
    this.startWrite();

    try {
      await apiService.createAnswer({
        questionId, body,
      });

      this.completeWrite();
    } catch (e) {
      this.failWrite();
    }
  }

  startAnswersLoad() {
    this.isAnswersLoading = true;
    this.answers = [];
    this.publish();
  }

  completeAnswersLoad(answers) {
    this.isAnswersLoading = false;
    this.answers = answers;
    this.publish();
  }

  failAnswersLoad() {
    this.isAnswersLoading = false;
    this.answers = [];
    this.publish();
  }

  startWrite() {
    this.writeStatus = 'processing';
  }

  completeWrite() {
    this.writeStatus = 'successful';
  }

  failWrite() {
    this.writeStatus = 'failed';
  }

  reset() {
    this.isAnswersLoading = false;
    this.answers = [];
    this.writeStatus = '';
  }

  get isWriteSuccessful() {
    return this.writeStatus === 'successful';
  }

  get isWriteFailed() {
    return this.writeStatus === 'failed';
  }
}

export const answerStore = new AnswerStore();
