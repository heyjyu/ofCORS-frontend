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

  describe('login', () => {
    context('when logged in successfully', () => {
      it('changes loginStatus to successful', async () => {
        const email = 'test@example.com';
        const password = 'Abcdef1!';

        await userStore.login({ email, password });

        expect(userStore.isLoginSuccessful).toBeTruthy();
      });
    });

    context('when failed to login', () => {
      it('changes loginStatus to failed', async () => {
        const email = 'wrong@email.com';
        const password = 'Abcdef1!';

        await userStore.login({ email, password });

        expect(userStore.isLoginFailed).toBeTruthy();
      });
    });
  });

  describe('fetchMe', () => {
    it('loads data of logged in user', async () => {
      await userStore.fetchMe();

      expect(userStore.user.id).toBe(1);
    });
  });

  describe('resetSignUpStatus', () => {
    it('resets signUpStatus', () => {
      userStore.changeSignUpStatus('processing');

      expect(userStore.signUpStatus).toBe('processing');

      userStore.resetSignUpStatus();

      expect(userStore.signUpStatus).toBe('');
    });
  });

  describe('resetLoginStatus', () => {
    it('resets loginStatus', () => {
      userStore.changeLoginStatus('processing');

      expect(userStore.loginStatus).toBe('processing');

      userStore.resetLoginStatus();

      expect(userStore.loginStatus).toBe('');
    });
  });
});
