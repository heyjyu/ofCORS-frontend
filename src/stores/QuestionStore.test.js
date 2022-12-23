import QuestionStore from './QuestionStore';

describe('QuestionStore', () => {
  let questionStore;

  beforeEach(() => {
    questionStore = new QuestionStore();
  });

  describe('fetchQuestions', () => {
    it('loads questions', async () => {
      await questionStore.fetchQuestions({ sort: 'createdAt' });

      expect(questionStore.questions).toHaveLength(2);
    });
  });
});
