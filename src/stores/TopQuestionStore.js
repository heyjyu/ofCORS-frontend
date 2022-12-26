import { apiService } from '../services/ApiService';

import Store from './Store';

export default class TopQuestionStore extends Store {
  constructor() {
    super();

    this.isQuestionsLoading = false;
    this.questions = [];
  }

  async fetchQuestions({ period }) {
    this.startLoad();

    try {
      const { questions } = await apiService.fetchTopQuestions({ period });

      this.completeLoad(questions);
    } catch (e) {
      this.failLoad();
    }
  }

  startLoad() {
    this.isQuestionsLoading = true;
    this.questions = [];
    this.publish();
  }

  completeLoad(questions) {
    this.isQuestionsLoading = false;
    this.questions = questions;
    this.publish();
  }

  failLoad() {
    this.isQuestionsLoading = false;
    this.questions = [];
    this.publish();
  }
}

export const topQuestionStore = new TopQuestionStore();
