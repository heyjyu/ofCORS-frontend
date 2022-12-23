import { apiService } from '../services/ApiService';

import Store from './Store';

export default class TopQuestionsStore extends Store {
  constructor() {
    super();

    this.fields = {};
  }

  async fetchQuestions({ period }) {
    this.fields.isQuestionsLoaded = false;

    this.publish();

    const { questions } = await apiService.fetchTopQuestions({ period });

    this.fields.questions = questions;

    this.fields.isQuestionsLoaded = true;

    this.publish();
  }
}

export const topQuestionsStore = new TopQuestionsStore();
