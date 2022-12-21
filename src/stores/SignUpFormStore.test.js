import SignUpFormStore from './SignUpFormStore';

const context = describe;

describe('SignUpFormStore', () => {
  let signUpFormStore;

  beforeEach(() => {
    signUpFormStore = new SignUpFormStore();
  });

  describe('changeDisplayName', () => {
    it('changes display name', () => {
      signUpFormStore.changeDisplayName('joo');

      expect(signUpFormStore.fields.displayName).toBe('joo');
    });
  });

  describe('changeEmail', () => {
    it('changes email', () => {
      signUpFormStore.changeEmail('test@example.com');

      expect(signUpFormStore.fields.email).toBe('test@example.com');
    });
  });

  describe('changePassword', () => {
    it('changes password', () => {
      signUpFormStore.changePassword('password');

      expect(signUpFormStore.fields.password).toBe('password');
    });
  });

  describe('changePasswordCheck', () => {
    it('changes passwordCheck', () => {
      signUpFormStore.changePasswordCheck('passwordCheck');

      expect(signUpFormStore.fields.passwordCheck).toBe('passwordCheck');
    });
  });

  describe('reset', () => {
    it('reset fields', () => {
      signUpFormStore.changePasswordCheck('passwordCheck');
      signUpFormStore.reset();

      expect(signUpFormStore.fields.passwordCheck).toBeFalsy();
    });
  });

  describe('validateDisplayName', () => {
    context('with valid display name', () => {
      it('does not set displayName error', () => {
        signUpFormStore.changeDisplayName('홍길동');

        signUpFormStore.validateDisplayName();

        expect(signUpFormStore.errors.displayName).toBeFalsy();
      });
    });

    context('with empty display name', () => {
      it('sets displayName error', () => {
        signUpFormStore.changeDisplayName('');

        signUpFormStore.validateDisplayName();

        expect(signUpFormStore.errors.displayName).toBeTruthy();
      });
    });

    context('with short display name', () => {
      it('sets displayName error', () => {
        signUpFormStore.changeDisplayName('길동');

        signUpFormStore.validateDisplayName();

        expect(signUpFormStore.errors.displayName).toBeTruthy();
      });
    });
  });

  describe('validateEmail', () => {
    context('with valid email', () => {
      it('does not set email error', () => {
        signUpFormStore.changeEmail('test@example.com');

        signUpFormStore.validateEmail();

        expect(signUpFormStore.errors.email).toBeFalsy();
      });
    });

    context('with empty email', () => {
      it('sets email error', () => {
        signUpFormStore.changeEmail('');

        signUpFormStore.validateEmail();

        expect(signUpFormStore.errors.email).toBeTruthy();
      });
    });

    context('when not in email format', () => {
      it('sets email error', () => {
        signUpFormStore.changeEmail('invalidEmail');

        signUpFormStore.validateEmail();

        expect(signUpFormStore.errors.email).toBeTruthy();
      });
    });
  });

  describe('validatePassword', () => {
    context('with valid password', () => {
      it('does not set password error', () => {
        signUpFormStore.changePassword('Abcdef1!');

        signUpFormStore.validatePassword();

        expect(signUpFormStore.errors.password).toBeFalsy();
      });
    });

    context('with empty password', () => {
      it('sets password error', () => {
        signUpFormStore.changePassword('');

        signUpFormStore.validatePassword();

        expect(signUpFormStore.errors.password).toBeTruthy();
      });
    });

    context('with short password', () => {
      it('sets password error', () => {
        signUpFormStore.changePassword('Abcde1!');

        signUpFormStore.validatePassword();

        expect(signUpFormStore.errors.password).toBeTruthy();
      });
    });

    context('with password without lower case', () => {
      it('sets password error', () => {
        signUpFormStore.changePassword('ABCDEF1!');

        signUpFormStore.validatePassword();

        expect(signUpFormStore.errors.password).toBeTruthy();
      });
    });

    context('with password without upper case', () => {
      it('sets password error', () => {
        signUpFormStore.changePassword('abcdef1!');

        signUpFormStore.validatePassword();

        expect(signUpFormStore.errors.password).toBeTruthy();
      });
    });

    context('with password without number', () => {
      it('sets password error', () => {
        signUpFormStore.changePassword('Abcdefg!');

        signUpFormStore.validatePassword();

        expect(signUpFormStore.errors.password).toBeTruthy();
      });
    });

    context('with password without special character', () => {
      it('sets password error', () => {
        signUpFormStore.changePassword('Abcdefg1');

        signUpFormStore.validatePassword();

        expect(signUpFormStore.errors.password).toBeTruthy();
      });
    });
  });

  describe('validatePasswordCheck', () => {
    context('with passwordCheck same as password', () => {
      it('does not set passwordCheck error', () => {
        signUpFormStore.changePassword('Abcdef1!');
        signUpFormStore.changePasswordCheck('Abcdef1!');

        signUpFormStore.validatePasswordCheck();

        expect(signUpFormStore.errors.passwordCheck).toBeFalsy();
      });
    });

    context('with empty passwordCheck', () => {
      it('sets passwordCheck error', () => {
        signUpFormStore.changePasswordCheck('');

        signUpFormStore.validatePasswordCheck();

        expect(signUpFormStore.errors.passwordCheck).toBeTruthy();
      });
    });

    context('with passwordCheck different from password', () => {
      it('sets addressErrorMessage', () => {
        signUpFormStore.changePassword('Abcdef1!');
        signUpFormStore.changePasswordCheck('ABcdef1!');

        signUpFormStore.validatePasswordCheck();

        expect(signUpFormStore.errors.passwordCheck).toBeTruthy();
      });
    });
  });
});
