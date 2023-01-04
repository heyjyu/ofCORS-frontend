import SelectAnswerFormStore from './SelectAnswerFormStore';

const context = describe;

describe('SelectAnswerFormStore', () => {
  let selectAnswerFormStore;

  beforeEach(() => {
    selectAnswerFormStore = new SelectAnswerFormStore();
  });

  describe('selectAnswerId', () => {
    it('changes selectedAnswerId', () => {
      selectAnswerFormStore.selectAnswerId(1);

      expect(selectAnswerFormStore.selectedAnswerId).toBe(1);
    });
  });

  describe('changeMessage', () => {
    it('changes message', () => {
      selectAnswerFormStore.changeMessage('감사합니다!');

      expect(selectAnswerFormStore.fields.message).toBe('감사합니다!');
    });
  });

  describe('changePoints', () => {
    it('changes points', () => {
      selectAnswerFormStore.changePoints(20);

      expect(selectAnswerFormStore.fields.points).toBe(20);
    });
  });

  describe('reset', () => {
    it('reset fields', () => {
      selectAnswerFormStore.changeMessage('감사합니다!');

      selectAnswerFormStore.reset();

      expect(selectAnswerFormStore.fields.message).toBeFalsy();
    });
  });

  describe('validatePoints', () => {
    context('with enough points', () => {
      it('does not set points error', async () => {
        selectAnswerFormStore.changePoints(20);
        await selectAnswerFormStore.validatePoints();

        expect(selectAnswerFormStore.errors.points).toBeFalsy();
      });
    });

    context('without enough points', () => {
      it('sets points error', async () => {
        selectAnswerFormStore.changePoints(20000);
        await selectAnswerFormStore.validatePoints();

        expect(selectAnswerFormStore.errors.points).toBeTruthy();
      });
    });
  });
});
