import AnswerStore from './AnswerStore';

const context = describe;

describe('AnswerStore', () => {
  let answerStore;

  beforeEach(() => {
    answerStore = new AnswerStore();
  });

  describe('fetchAnswers', () => {
    it('loads answers', async () => {
      await answerStore.fetchAnswers({ questionId: 1 });

      expect(answerStore.answers).toHaveLength(1);
    });
  });

  describe('fetchAnswer', () => {
    it('loads answer', async () => {
      const id = 1;

      await answerStore.fetchAnswer(id);

      expect(answerStore.answer.id).toBe(id);
    });
  });

  describe('write', () => {
    context('when written successfully', () => {
      it('changes writeStatus to successful', async () => {
        const questionId = 1;
        const body = '헤더를 추가해보세요';

        await answerStore.write({
          questionId, body,
        });

        expect(answerStore.isWriteSuccessful).toBeTruthy();
      });
    });

    context('when failed to write', () => {
      it('changes writeStatus to failed', async () => {
        const questionId = 1;
        const body = '';

        await answerStore.write({
          questionId, body,
        });

        expect(answerStore.isWriteFailed).toBeTruthy();
      });
    });
  });

  describe('reset', () => {
    it('reset fields', () => {
      answerStore.writeStatus = 'successful';
      answerStore.reset();

      expect(answerStore.createStatus).toBeFalsy();
    });
  });
});
