import { apiService } from '../services/ApiService';

import Store from './Store';

export default class QuestionStore extends Store {
  constructor() {
    super();

    this.isQuestionsLoaded = false;
    this.questions = [];
    this.keyword = '';
  }

  async fetchQuestions({ sort, keyword = '' }) {
    this.isQuestionsLoaded = false;

    this.publish();

    const { questions } = await apiService.fetchQuestions({ sort, keyword });

    this.questions = questions;

    this.isQuestionsLoaded = true;

    this.publish();
  }

  changeKeyword(keyword) {
    this.keyword = keyword;

    this.publish();
  }
}

export const questionStore = new QuestionStore();
