import AnswerEditFormStore from './AnswerEditFormStore';

const context = describe;

describe('AnswerEditFormStore', () => {
  let answerEditFormStore;

  beforeEach(() => {
    answerEditFormStore = new AnswerEditFormStore();
  });

  describe('changeBody', () => {
    it('changes body', () => {
      answerEditFormStore.changeBody('헤더를 추가해보세요');

      expect(answerEditFormStore.fields.body).toBe('헤더를 추가해보세요');
    });
  });

  describe('reset', () => {
    it('reset fields', () => {
      answerEditFormStore.changeBody('헤더를 추가해보세요');
      answerEditFormStore.reset();

      expect(answerEditFormStore.fields.body).toBeFalsy();
    });
  });

  describe('fillFields', () => {
    it('fills fields', () => {
      const answer = {
        id: 1,
        body: '헤더를 추가해보세요',
        likeUserIds: [],
        createdAt: '2022-12-21T19:05:30.574542',
        updatedAt: '2022-12-21T19:05:30.574542',
        author: { id: 2, displayName: '동길홍' },
      };

      answerEditFormStore.fillFields(answer);

      expect(answerEditFormStore.fields.body).toBe('헤더를 추가해보세요');
    });
  });

  describe('validateBody', () => {
    context('with valid body', () => {
      it('does not set body error', () => {
        answerEditFormStore.changeBody('헤더를 추가해보세요');

        answerEditFormStore.validateBody();

        expect(answerEditFormStore.errors.body).toBeFalsy();
      });
    });

    context('with empty body', () => {
      it('sets body error', () => {
        answerEditFormStore.changeBody('');

        answerEditFormStore.validateBody();

        expect(answerEditFormStore.errors.body).toBeTruthy();
      });
    });
  });
});
