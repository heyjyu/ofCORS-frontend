import { apiService } from '../services/ApiService';
import ExchangeStore from './ExchangeStore';

describe('ExchangeStore', () => {
  let exchangeStore;

  beforeEach(() => {
    exchangeStore = new ExchangeStore();
  });

  describe('fetchExchanges', () => {
    it('fetch exchanges', async () => {
      apiService.setAccessToken('ACCESS.TOKEN');

      await exchangeStore.fetchExchanges();

      expect(exchangeStore.exchanges).toHaveLength(2);
    });
  });
});
