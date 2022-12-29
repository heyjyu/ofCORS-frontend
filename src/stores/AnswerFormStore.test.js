import AnswerFormStore from './AnswerFormStore';

const context = describe;

describe('AnswerFormStore', () => {
  let answerFormStore;

  beforeEach(() => {
    answerFormStore = new AnswerFormStore();
  });

  describe('changeBody', () => {
    it('changes body', () => {
      answerFormStore.changeBody('헤더를 추가해보세요');

      expect(answerFormStore.fields.body).toBe('헤더를 추가해보세요');
    });
  });

  describe('reset', () => {
    it('reset fields', () => {
      answerFormStore.changeBody('헤더를 추가해보세요');
      answerFormStore.reset();

      expect(answerFormStore.fields.body).toBeFalsy();
    });
  });

  describe('validateBody', () => {
    context('with valid body', () => {
      it('does not set body error', () => {
        answerFormStore.changeBody('헤더를 추가해보세요');

        answerFormStore.validateBody();

        expect(answerFormStore.errors.body).toBeFalsy();
      });
    });

    context('with empty body', () => {
      it('sets body error', () => {
        answerFormStore.changeBody('');

        answerFormStore.validateBody();

        expect(answerFormStore.errors.body).toBeTruthy();
      });
    });
  });
});
