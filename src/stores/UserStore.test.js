import UserStore from './UserStore';

const context = describe;

describe('UserStore', () => {
  let userStore;

  beforeEach(() => {
    userStore = new UserStore();
  });

  describe('signUp', () => {
    context('when signed up successfully', () => {
      it('changes signUpStatus to successful', async () => {
        const displayName = 'joo';
        const email = 'test@example.com';
        const password = 'Abcdef1!';

        await userStore.signUp({
          displayName, email, password,
        });

        expect(userStore.isSignUpSuccessful).toBeTruthy();
      });
    });

    context('when failed to sign up', () => {
      it('changes signUpStatus to failed', async () => {
        const displayName = 'joo';
        const email = 'exist@email.com';
        const password = 'Abcdef1!';

        await userStore.signUp({
          displayName, email, password,
        });

        expect(userStore.isSignUpFailed).toBeTruthy();
      });
    });
  });

  describe('resetSignUpStatus', () => {
    it('resets signUpStatus', () => {
      userStore.changeSignUpStatus('processing');

      expect(userStore.fields.signUpStatus).toBe('processing');

      userStore.resetSignUpStatus();

      expect(userStore.fields.signUpStatus).toBe('');
    });
  });
});
