import VerifyUserFormStore from './VerifyUserFormStore';

const context = describe;

describe('VerifyUserFormStore', () => {
  let verifyUserFormStore;

  beforeEach(() => {
    verifyUserFormStore = new VerifyUserFormStore();
  });

  describe('changeName', () => {
    it('changes name', () => {
      verifyUserFormStore.changeName('홍길동');

      expect(verifyUserFormStore.fields.name).toBe('홍길동');
    });
  });

  describe('changePhoneNumber', () => {
    it('changes phoneNumber', () => {
      verifyUserFormStore.changePhoneNumber('01012345678');

      expect(verifyUserFormStore.fields.phoneNumber).toBe('01012345678');
    });
  });

  describe('reset', () => {
    it('reset fields', () => {
      verifyUserFormStore.changePhoneNumber('01012345678');

      verifyUserFormStore.reset();

      expect(verifyUserFormStore.fields.phoneNumber).toBeFalsy();
    });
  });

  describe('validateName', () => {
    context('with name', () => {
      it('does not set name error', () => {
        verifyUserFormStore.changeName('홍길동');

        verifyUserFormStore.validateName();

        expect(verifyUserFormStore.errors.name).toBeFalsy();
      });
    });

    context('with empty name', () => {
      it('sets name error', () => {
        verifyUserFormStore.changeName('');

        verifyUserFormStore.validateName();

        expect(verifyUserFormStore.errors.name).toBeTruthy();
      });
    });
  });

  describe('validatePhoneNumber', () => {
    context('with phoneNumber', () => {
      it('does not set phoneNumber error', () => {
        verifyUserFormStore.changePhoneNumber('01012345678');

        verifyUserFormStore.validatePhoneNumber();

        expect(verifyUserFormStore.errors.phoneNumber).toBeFalsy();
      });
    });

    context('with empty phoneNumber', () => {
      it('sets phoneNumber error', () => {
        verifyUserFormStore.changePhoneNumber('');

        verifyUserFormStore.validatePhoneNumber();

        expect(verifyUserFormStore.errors.phoneNumber).toBeTruthy();
      });
    });
  });
});
