import { apiService } from '../services/ApiService';

import Store from './Store';

export default class QuestionStore extends Store {
  constructor() {
    super();

    this.isQuestionsLoaded = false;
    this.questions = [];
  }

  async fetchQuestions({ sort }) {
    this.isQuestionsLoaded = false;

    this.publish();

    const { questions } = await apiService.fetchQuestions({ sort });

    this.questions = questions;

    this.isQuestionsLoaded = true;

    this.publish();
  }
}

export const questionStore = new QuestionStore();
