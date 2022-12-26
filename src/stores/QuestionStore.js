import { apiService } from '../services/ApiService';

import Store from './Store';

export default class QuestionStore extends Store {
  constructor() {
    super();

    this.reset();
  }

  async fetchQuestions({ sort, keyword = '' }) {
    this.startLoad();

    try {
      const { questions } = await apiService.fetchQuestions({ sort, keyword });

      this.completeLoad(questions);
    } catch (e) {
      this.failLoad();
    }
  }

  changeKeyword(keyword) {
    this.keyword = keyword;

    this.publish();
  }

  async create({
    title, body, tags, points,
  }) {
    this.startWrite();

    try {
      await apiService.createQuestion({
        title, body, tags, points,
      });

      this.completeWrite();
    } catch (e) {
      this.failWrite();
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

  startWrite() {
    this.createStatus = 'processing';
  }

  completeWrite() {
    this.createStatus = 'successful';
  }

  failWrite() {
    this.createStatus = 'failed';
  }

  reset() {
    this.isQuestionsLoading = false;
    this.questions = [];
    this.keyword = '';
    this.createStatus = '';
  }

  get isCreateSuccessful() {
    return this.createStatus === 'successful';
  }

  get isCreateFailed() {
    return this.createStatus === 'failed';
  }
}

export const questionStore = new QuestionStore();
