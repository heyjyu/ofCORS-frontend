import ExchangeFormStore from './ExchangeFormStore';

const context = describe;

describe('ExchangeFormStore', () => {
  let exchangeFormStore;

  beforeEach(() => {
    exchangeFormStore = new ExchangeFormStore();
  });

  describe('changePoints', () => {
    it('changes points', () => {
      exchangeFormStore.changePoints({ points: 1000, pointsOfUser: 1100 });

      expect(exchangeFormStore.fields.points).toBe(1000);
    });
  });

  describe('changeBank', () => {
    it('changes bank', () => {
      exchangeFormStore.changeBank('하나은행');

      expect(exchangeFormStore.fields.bank).toBe('하나은행');
    });
  });

  describe('changeAccountNumber', () => {
    it('changes accountNumber', () => {
      exchangeFormStore.changeAccountNumber('111111111111');

      expect(exchangeFormStore.fields.accountNumber).toBe('111111111111');
    });
  });

  describe('validatePoints', () => {
    context('with enough points', () => {
      it('does not set points error', () => {
        exchangeFormStore.changePoints({ points: 500, pointsOfUser: 1100 });

        const pointsOfUser = 600;

        exchangeFormStore.validatePoints(pointsOfUser);

        expect(exchangeFormStore.errors.points).toBeFalsy();
      });
    });

    context('without enough points', () => {
      it('sets points error', () => {
        exchangeFormStore.changePoints({ points: 1000, pointsOfUser: 1100 });

        const pointsOfUser = 600;

        exchangeFormStore.validatePoints(pointsOfUser);

        expect(exchangeFormStore.errors.points).toBeTruthy();
      });
    });

    context('with points less than minimum amount', () => {
      it('sets points error', () => {
        exchangeFormStore.changePoints({ points: 100, pointsOfUser: 1100 });

        const pointsOfUser = 600;

        exchangeFormStore.validatePoints(pointsOfUser);

        expect(exchangeFormStore.errors.points).toBeTruthy();
      });
    });
  });

  describe('validateAccount', () => {
    context('with valid account', () => {
      it('sets accountNumberValidated to true', async () => {
        exchangeFormStore.changeBank('하나은행');
        exchangeFormStore.changeAccountNumber('111111111111');

        await exchangeFormStore.validateAccount();

        expect(exchangeFormStore.accountNumberValidated).toBe(true);
      });
    });

    context('with invalid account', () => {
      it('sets accountNumberValidated to false', async () => {
        exchangeFormStore.changeBank('하나은행');
        exchangeFormStore.changeAccountNumber('');

        await exchangeFormStore.validateAccount();

        expect(exchangeFormStore.accountNumberValidated).toBeFalsy();
      });
    });
  });

  describe('requestExchange', () => {
    context('when exchanged successfully', () => {
      it('changes exchangeStatus to successful', async () => {
        exchangeFormStore.changePoints({ points: 500, pointsOfUser: 1100 });
        exchangeFormStore.changeBank('하나은행');
        exchangeFormStore.changeAccountNumber('111111111111');

        await exchangeFormStore.requestExchange();

        expect(exchangeFormStore.isRequestExchangeSuccessful).toBeTruthy();
      });
    });

    context('when failed to exchange', () => {
      it('changes exchangeStatus to failed', async () => {
        exchangeFormStore.changePoints({ points: 100, pointsOfUser: 1100 });
        exchangeFormStore.changeBank('하나은행');
        exchangeFormStore.changeAccountNumber('111111111111');

        await exchangeFormStore.requestExchange();

        expect(exchangeFormStore.isRequestExchangeFailed).toBeTruthy();
      });
    });
  });
});
