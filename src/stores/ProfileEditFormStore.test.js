import ProfileEditFormStore from './ProfileEditFormStore';

const context = describe;

jest.mock('../config', () => ({
  cloudinaryName: 'ofcors-image-server',
}));

describe('ProfileEditFormStore', () => {
  let profileEditFormStore;

  beforeEach(() => {
    jest.clearAllMocks();
    profileEditFormStore = new ProfileEditFormStore();
  });

  describe('reset', () => {
    it('reset fields', () => {
      profileEditFormStore.changeDisplayName('joooo');
      profileEditFormStore.reset();

      expect(profileEditFormStore.fields.displayName).toBeFalsy();
    });
  });

  describe('fillFields', () => {
    it('fills fields', () => {
      const user = {
        id: 1,
        displayName: 'hong',
        about: '저는 이런 사람입니다',
        points: 100,
        realName: '홍길동',
        imageUrl: 'https://www.google.com/image.jpg',
        countOfLikes: 20,
        tags: [{ name: 'Web' }],
      };

      profileEditFormStore.fillFields(user);

      expect(profileEditFormStore.fields.imageUrl).toBe('https://www.google.com/image.jpg');
    });
  });

  describe('changeImage', () => {
    it('changes imageUrl', async () => {
      await profileEditFormStore.changeImage({
        name: 'banner.png',
        lastModified: 1669795723283,
        lastModifiedDate: new Date(),
        webkitRelativePath: '',
        size: 178528,
        type: 'image/png',
      });

      expect(profileEditFormStore.fields.imageUrl).toBeTruthy();
    });
  });

  describe('changeDisplayName', () => {
    it('changes display name', () => {
      profileEditFormStore.changeDisplayName('joo');

      expect(profileEditFormStore.fields.displayName).toBe('joo');
    });
  });

  describe('changeAbout', () => {
    it('changes about', () => {
      profileEditFormStore.changeAbout('joo');

      expect(profileEditFormStore.fields.about).toBe('joo');
    });
  });

  describe('changeTag', () => {
    it('changes tag', () => {
      profileEditFormStore.changeTag('Web');

      expect(profileEditFormStore.fields.tag).toBe('Web');
    });
  });

  describe('addTag', () => {
    context('when tag is empty', () => {
      it('does not add tag', () => {
        profileEditFormStore.changeTag('');
        profileEditFormStore.addTag();

        expect(profileEditFormStore.tags.size).toBe(0);
      });
    });

    context('when tag is not empty', () => {
      it('adds tag', () => {
        const tag = 'Web';
        profileEditFormStore.changeTag(tag);
        profileEditFormStore.addTag();

        expect(profileEditFormStore.tags.has(tag)).toBeTruthy();
      });
    });
  });

  describe('removeTag', () => {
    it('removes tag', () => {
      const tag = 'Web';
      profileEditFormStore.changeTag(tag);
      profileEditFormStore.addTag();
      profileEditFormStore.removeTag(tag);

      expect(profileEditFormStore.tags.has(tag)).toBeFalsy();
    });
  });

  describe('validateDisplayName', () => {
    context('with valid display name', () => {
      it('does not set displayName error', () => {
        profileEditFormStore.changeDisplayName('홍길동');

        profileEditFormStore.validateDisplayName();

        expect(profileEditFormStore.errors.displayName).toBeFalsy();
      });
    });

    context('with empty display name', () => {
      it('sets displayName error', () => {
        profileEditFormStore.changeDisplayName('');

        profileEditFormStore.validateDisplayName();

        expect(profileEditFormStore.errors.displayName).toBeTruthy();
      });
    });

    context('with short display name', () => {
      it('sets displayName error', () => {
        profileEditFormStore.changeDisplayName('길동');

        profileEditFormStore.validateDisplayName();

        expect(profileEditFormStore.errors.displayName).toBeTruthy();
      });
    });
  });
});
