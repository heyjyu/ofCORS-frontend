import TopQuestionStore from './TopQuestionStore';

describe('TopQuestionStore', () => {
  let topQuestionStore;

  beforeEach(() => {
    topQuestionStore = new TopQuestionStore();
  });

  describe('fetchQuestions', () => {
    it('loads questions', async () => {
      await topQuestionStore.fetchQuestions({ period: 'week' });

      expect(topQuestionStore.questions).toHaveLength(2);
    });
  });
});
