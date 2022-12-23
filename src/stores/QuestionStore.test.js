import QuestionStore from './QuestionStore';

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
});
