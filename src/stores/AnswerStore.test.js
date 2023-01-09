import { apiService } from '../services/ApiService';
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

  describe('toggleLike', () => {
    it('toggles like', async () => {
      apiService.setAccessToken('ACCESS.TOKEN');

      await answerStore.fetchAnswers({ questionId: 1 });

      expect(answerStore.answers[0].likeUserIds.length).toBe(0);

      await answerStore.toggleLike(1);

      expect(answerStore.answers[0].likeUserIds.length).toBe(1);
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

  describe('modify', () => {
    context('when modified successfully', () => {
      it('changes modifyStatus to successful', async () => {
        const answerId = 1;
        const body = '수정한 답변입니다';

        await answerStore.modify({
          answerId,
          body,
        });

        expect(answerStore.isModifySuccessful).toBeTruthy();
      });
    });

    context('when failed to modify', () => {
      it('changes modifyStatus to failed', async () => {
        const answerId = 1;
        const body = '';

        await answerStore.modify({
          answerId,
          body,
        });

        expect(answerStore.isModifyFailed).toBeTruthy();
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
