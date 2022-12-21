import LoginFormStore from './LoginFormStore';

const context = describe;

describe('LoginFormStore', () => {
  let loginFormStore;

  beforeEach(() => {
    loginFormStore = new LoginFormStore();
  });

  describe('changeEmail', () => {
    it('changes email', () => {
      loginFormStore.changeEmail('test@example.com');

      expect(loginFormStore.fields.email).toBe('test@example.com');
    });
  });

  describe('changePassword', () => {
    it('changes password', () => {
      loginFormStore.changePassword('password');

      expect(loginFormStore.fields.password).toBe('password');
    });
  });

  describe('reset', () => {
    it('resets fields', () => {
      loginFormStore.changePassword('password');
      loginFormStore.reset();

      expect(loginFormStore.fields.password).toBeFalsy();
    });
  });

  describe('validate', () => {
    context('with email', () => {
      it('does not set email error', () => {
        loginFormStore.changeEmail('test@example.com');

        loginFormStore.validate();

        expect(loginFormStore.errors.email).toBeFalsy();
      });
    });

    context('with password', () => {
      it('does not set password error', () => {
        loginFormStore.changePassword('password');

        loginFormStore.validate();

        expect(loginFormStore.errors.password).toBeFalsy();
      });
    });

    context('with empty email', () => {
      it('sets email error', () => {
        loginFormStore.changeEmail('');
        loginFormStore.changePassword('password');

        loginFormStore.validate();

        expect(loginFormStore.errors.email).toBeTruthy();
        expect(loginFormStore.isValidateSuccessful).toBeFalsy();
      });
    });

    context('with empty password', () => {
      it('sets password error', () => {
        loginFormStore.changeEmail('myid');
        loginFormStore.changePassword('');

        loginFormStore.validate();

        expect(loginFormStore.errors.password).toBeTruthy();
        expect(loginFormStore.isValidateSuccessful).toBeFalsy();
      });
    });

    context('with empty email and password', () => {
      it('sets email error', () => {
        loginFormStore.changeEmail('');
        loginFormStore.changePassword('');

        loginFormStore.validate();

        expect(loginFormStore.errors.email).toBeTruthy();
        expect(loginFormStore.isValidateSuccessful).toBeFalsy();
      });

      it('sets password error', () => {
        loginFormStore.changeEmail('');
        loginFormStore.changePassword('');

        loginFormStore.validate();

        expect(loginFormStore.errors.password).toBeTruthy();
      });
    });
  });
});
