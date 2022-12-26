import { apiService } from '../services/ApiService';

import Store from './Store';

export default class SearchStore extends Store {
  constructor() {
    super();

    this.keyword = '';
    this.isResultsLoading = false;
    this.results = [];
  }

  changeKeyword(keyword) {
    this.keyword = keyword;

    this.publish();
  }

  async fetchResults({ keyword }) {
    this.startLoad();

    try {
      const { questions } = await apiService.fetchSearchResults({ keyword });

      this.completeLoad(questions);
    } catch (e) {
      this.failLoad();
    }
  }

  startLoad() {
    this.isQuestionsLoading = true;
    this.results = [];
    this.publish();
  }

  completeLoad(questions) {
    this.isQuestionsLoading = false;
    this.results = questions;
    this.publish();
  }

  failLoad() {
    this.isQuestionsLoading = false;
    this.results = [];
    this.publish();
  }
}

export const searchStore = new SearchStore();
