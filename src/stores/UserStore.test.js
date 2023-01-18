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

  describe('fetchUsers', () => {
    it('loads users', async () => {
      await userStore.fetchUsers({ sort: 'like' });

      expect(userStore.users).toHaveLength(2);
    });
  });

  describe('fetchUser', () => {
    it('loads user', async () => {
      await userStore.fetchUser(1);

      expect(userStore.user).not.toBeNull();
    });
  });

  describe('changeKeyword', () => {
    it('changes keyword', () => {
      userStore.changeKeyword('CORS');

      expect(userStore.keyword).toBe('CORS');
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

  describe('resetEditStatus', () => {
    it('resets editStatus', () => {
      userStore.changeEditStatus('processing');

      expect(userStore.editStatus).toBe('processing');

      userStore.resetEditStatus();

      expect(userStore.editStatus).toBe('');
    });
  });

  describe('editProfile', () => {
    context('when edited successfully', () => {
      it('changes editStatus to successful', async () => {
        await userStore.fetchMe();

        const displayName = 'hong';
        const about = '저는 객체 지향 프로그래밍을 좋아합니다';
        const imageUrl = 'https://image.com';
        const tags = new Set();

        await userStore.editProfile({
          displayName,
          about,
          imageUrl,
          tags,
        });

        expect(userStore.isEditSuccessful).toBeTruthy();
      });
    });

    context('when failed to edit', () => {
      it('changes editStatus to failed', async () => {
        await userStore.fetchMe();

        const displayName = '';
        const about = '저는 객체 지향 프로그래밍을 좋아합니다';
        const imageUrl = 'https://image.com';
        const tags = new Set();

        await userStore.editProfile({
          displayName,
          about,
          imageUrl,
          tags,
        });

        expect(userStore.isEditFailed).toBeTruthy();
      });
    });
  });
});
