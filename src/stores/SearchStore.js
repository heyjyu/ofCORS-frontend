import { apiService } from '../services/ApiService';

import Store from './Store';

export default class SearchStore extends Store {
  constructor() {
    super();

    this.keyword = '';
    this.isResultsLoaded = false;
    this.results = [];
  }

  changeKeyword(keyword) {
    this.keyword = keyword;

    this.publish();
  }

  async fetchResults({ keyword }) {
    this.isResultsLoaded = false;

    this.publish();

    const { questions } = await apiService.fetchSearchResults({ keyword });

    this.results = questions;

    this.isResultsLoaded = true;

    this.publish();
  }
}

export const searchStore = new SearchStore();
