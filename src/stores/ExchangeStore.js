import { apiService } from '../services/ApiService';

import Store from './Store';

export default class ExchangeStore extends Store {
  constructor() {
    super();

    this.reset();
  }

  async fetchExchanges() {
    this.startExchangesLoad();

    try {
      const { exchanges } = await apiService.fetchExchanges();

      this.completeExchangesLoad(exchanges);
    } catch (e) {
      this.failExchangesLoad();
    }
  }

  startExchangesLoad() {
    this.isExchangesLoading = true;
    this.exchanges = [];
    this.publish();
  }

  completeExchangesLoad(exchanges) {
    this.isAnswersLoading = false;
    this.exchanges = exchanges;
    this.publish();
  }

  failExchangesLoad() {
    this.isExchangesLoading = false;
    this.exchanges = [];
    this.publish();
  }

  reset() {
    this.isExchangesLoading = false;
    this.exchanges = [];
  }
}

export const exchangeStore = new ExchangeStore();
