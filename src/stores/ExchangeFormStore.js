import { apiService } from '../services/ApiService';
import Store from './Store';

export default class ExchangeFormStore extends Store {
  constructor() {
    super();

    this.errorMessages = {
      points: {
        insufficient: '보유하고 있는 포인트보다 많은 포인트를 입력하셨습니다',
        lessThanMinimum: '최소 500포인트부터 환전이 가능합니다',
      },
    };

    this.minimumExchangePoints = 500;

    this.reset();
  }

  changePoints({ points, pointsOfUser }) {
    this.fields.points = points;
    this.validatePoints(pointsOfUser);

    this.publish();
  }

  changeBank(bank) {
    this.fields.bank = bank;

    this.publish();
  }

  changeAccountNumber(accountNumber) {
    this.fields.accountNumber = accountNumber;

    this.publish();
  }

  validatePoints(pointsOfUser) {
    if (this.fields.points > pointsOfUser) {
      this.errors.points = this.errorMessages.points.insufficient;
      this.publish();

      return;
    }

    if (this.fields.points < this.minimumExchangePoints) {
      this.errors.points = this.errorMessages.points.lessThanMinimum;
      this.publish();

      return;
    }

    this.errors.points = '';
    this.publish();
  }

  async validateAccount() {
    this.startValidate();

    try {
      const { validated } = await apiService.validateAccount({
        bank: this.fields.bank, accountNumber: this.fields.accountNumber,
      });

      this.completeValidate(validated);
    } catch (e) {
      this.failValidate();
    }
  }

  startValidate() {
    this.isValidatingAccount = true;
    this.validateStatus = 'processing';

    this.publish();
  }

  completeValidate(validated) {
    this.isValidatingAccount = false;

    if (validated) {
      this.validateStatus = 'successful';
    }

    if (!validated) {
      this.validateStatus = 'failed';
    }

    this.publish();
  }

  failValidate() {
    this.isValidatingAccount = false;
    this.validateStatus = 'failed';

    this.publish();
  }

  async requestExchange() {
    this.startRequestExchange();

    try {
      await apiService.requestExchange({
        points: this.fields.points,
        bank: this.fields.bank,
        accountNumber: this.fields.accountNumber,
      });

      this.completeRequestExchange();
    } catch (e) {
      this.failRequestExchange();
    }
  }

  startRequestExchange() {
    this.requestExchangeStatus = 'processing';
    this.publish();
  }

  completeRequestExchange() {
    this.requestExchangeStatus = 'successful';
    this.publish();
  }

  failRequestExchange() {
    this.requestExchangeStatus = 'failed';
    this.publish();
  }

  reset() {
    this.fields = {};
    this.errors = {};
    this.isValidatingAccount = false;
    this.validateStatus = '';
    this.requestExchangeStatus = '';

    this.publish();
  }

  get accountNumberValidated() {
    return this.validateStatus === 'successful';
  }

  get isRequestExchangeSuccessful() {
    return this.requestExchangeStatus === 'successful';
  }

  get isRequestExchangeFailed() {
    return this.requestExchangeStatus === 'failed';
  }

  get isValidateSuccessful() {
    return !Object.values(this.errors).some((error) => error);
  }
}

export const exchangeFormStore = new ExchangeFormStore();
