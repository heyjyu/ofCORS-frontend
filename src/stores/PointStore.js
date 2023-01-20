import { apiService } from '../services/ApiService';

import Store from './Store';

export default class PointStore extends Store {
  constructor() {
    super();

    this.reset();
  }

  // eslint-disable-next-line class-methods-use-this
  async charge(point) {
    const kakaoPayUrl = await apiService.charge(point);

    return kakaoPayUrl;
  }

  async fetchPaymentResult(pgToken) {
    const data = await apiService.fetchPaymentResult(pgToken);
    this.paymentResult = data;

    this.publish();
  }

  reset() {
    this.paymentResult = null;

    this.publish();
  }
}

export const pointStore = new PointStore();
