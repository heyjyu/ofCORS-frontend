import { apiService } from '../services/ApiService';

import Store from './Store';

export default class SearchStore extends Store {
  constructor() {
    super();

    this.fields = {};
  }

  changeKeyword(keyword) {
    this.fields.keyword = keyword;

    this.publish();
  }

  async fetchResults({ keyword }) {
    this.fields.isResultsLoaded = false;

    this.publish();

    const { questions } = await apiService.fetchSearchResults({ keyword });

    this.fields.results = questions;

    this.fields.isResultsLoaded = true;

    this.publish();
  }
}

export const searchStore = new SearchStore();
