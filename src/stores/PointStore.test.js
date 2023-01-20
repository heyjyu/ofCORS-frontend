import PointStore from './PointStore';

describe('PointStore', () => {
  let pointStore;

  beforeEach(() => {
    pointStore = new PointStore();
  });

  describe('charge', () => {
    it('returns redirect url', async () => {
      const kakaoPayUrl = await pointStore.charge(10);

      expect(kakaoPayUrl).not.toBeNull();
    });
  });

  describe('fetchPaymentResult', () => {
    it('changes payment result', async () => {
      await pointStore.fetchPaymentResult('pg_token');

      expect(pointStore.paymentResult).not.toBeNull();
    });
  });
});
