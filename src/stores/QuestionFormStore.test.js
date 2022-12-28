import QuestionFormStore from './QuestionFormStore';

const context = describe;

describe('QuestionFormStore', () => {
  let questionFormStore;

  beforeEach(() => {
    questionFormStore = new QuestionFormStore();
  });

  describe('changeTitle', () => {
    it('changes title', () => {
      questionFormStore.changeTitle('CORS 에러가 발생합니다');

      expect(questionFormStore.fields.title).toBe('CORS 에러가 발생합니다');
    });
  });

  describe('changeBody', () => {
    it('changes body', () => {
      questionFormStore.changeBody('서버를 배포 후 특정 요청에서 CORS에러가 발생합니다');

      expect(questionFormStore.fields.body).toBe('서버를 배포 후 특정 요청에서 CORS에러가 발생합니다');
    });
  });

  describe('changeTag', () => {
    it('changes tag', () => {
      questionFormStore.changeTag('Web');

      expect(questionFormStore.fields.tag).toBe('Web');
    });
  });

  describe('changePoints', () => {
    it('changes points', () => {
      questionFormStore.changePoints(20);

      expect(questionFormStore.fields.points).toBe(20);
    });
  });

  describe('addTag', () => {
    context('when tag is empty', () => {
      it('does not add tag', () => {
        questionFormStore.changeTag('');
        questionFormStore.addTag();

        expect(questionFormStore.tags.size).toBe(0);
      });
    });

    context('when tag is not empty', () => {
      it('adds tag', () => {
        const tag = 'Web';
        questionFormStore.changeTag(tag);
        questionFormStore.addTag();

        expect(questionFormStore.tags.has(tag)).toBeTruthy();
      });
    });
  });

  describe('removeTag', () => {
    it('removes tag', () => {
      const tag = 'Web';
      questionFormStore.changeTag(tag);
      questionFormStore.addTag();
      questionFormStore.removeTag(tag);

      expect(questionFormStore.tags.has(tag)).toBeFalsy();
    });
  });

  describe('reset', () => {
    it('reset fields', () => {
      questionFormStore.changeTitle('CORS 에러가 발생합니다');
      questionFormStore.reset();

      expect(questionFormStore.fields.title).toBeFalsy();
    });
  });

  describe('validateTitle', () => {
    context('with title', () => {
      it('does not set title error', () => {
        questionFormStore.changeTitle('CORS 에러가 발생합니다');

        questionFormStore.validateTitle();

        expect(questionFormStore.errors.title).toBeFalsy();
      });
    });

    context('with empty title', () => {
      it('sets title error', () => {
        questionFormStore.changeTitle('');

        questionFormStore.validateTitle();

        expect(questionFormStore.errors.title).toBeTruthy();
      });
    });
  });

  describe('validateBody', () => {
    context('with body', () => {
      it('does not set body error', () => {
        questionFormStore.changeBody('서버를 배포 후 특정 요청에서 CORS에러가 발생합니다');

        questionFormStore.validateBody();

        expect(questionFormStore.errors.body).toBeFalsy();
      });
    });

    context('with empty body', () => {
      it('sets body error', () => {
        questionFormStore.changeBody('');

        questionFormStore.validateBody();

        expect(questionFormStore.errors.body).toBeTruthy();
      });
    });
  });

  describe('validatePoints', () => {
    context('with enough points', () => {
      it('does not set points error', async () => {
        questionFormStore.changePoints(20);
        await questionFormStore.validatePoints();

        expect(questionFormStore.errors.points).toBeFalsy();
      });
    });

    context('without enough points', () => {
      it('sets points error', async () => {
        questionFormStore.changePoints(20000);
        await questionFormStore.validatePoints();

        expect(questionFormStore.errors.points).toBeTruthy();
      });
    });
  });
});
