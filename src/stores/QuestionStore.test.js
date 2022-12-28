import QuestionStore from './QuestionStore';

const context = describe;

describe('QuestionStore', () => {
  let questionStore;

  beforeEach(() => {
    questionStore = new QuestionStore();
  });

  describe('fetchQuestions', () => {
    it('loads questions', async () => {
      await questionStore.fetchQuestions({ sort: 'createdAt', keyword: 'CORS' });

      expect(questionStore.questions).toHaveLength(2);
    });
  });

  describe('changeKeyword', () => {
    it('changes keyword', () => {
      questionStore.changeKeyword('CORS');

      expect(questionStore.keyword).toBe('CORS');
    });
  });

  describe('create', () => {
    context('when created successfully', () => {
      it('changes createStatus to successful', async () => {
        const title = 'CORS 에러가 뜹니다.';
        const body = '서버 배포 후 CORS에러가 발생합니다.';
        const tags = new Set('Web');
        const points = 20;

        await questionStore.create({
          title, body, tags, points,
        });

        expect(questionStore.isCreateSuccessful).toBeTruthy();
      });
    });

    context('when failed to sign up', () => {
      it('changes signUpStatus to failed', async () => {
        const title = 'CORS 에러가 뜹니다.';
        const body = '';
        const tags = new Set('Web');
        const points = 20;

        await questionStore.create({
          title, body, tags, points,
        });

        expect(questionStore.isCreateFailed).toBeTruthy();
      });
    });
  });

  describe('reset', () => {
    it('reset fields', () => {
      questionStore.createStatus = 'successful';
      questionStore.reset();

      expect(questionStore.createStatus).toBeFalsy();
    });
  });
});
