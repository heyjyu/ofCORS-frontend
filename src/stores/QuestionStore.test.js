import { apiService } from '../services/ApiService';
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

  describe('fetchQuestion', () => {
    it('loads question', async () => {
      await questionStore.fetchQuestion(1);

      expect(questionStore.question).not.toBeNull();
    });
  });

  describe('changeKeyword', () => {
    it('changes keyword', () => {
      questionStore.changeKeyword('CORS');

      expect(questionStore.keyword).toBe('CORS');
    });
  });

  describe('toggleLike', () => {
    it('toggles like', async () => {
      apiService.setAccessToken('ACCESS.TOKEN');

      await questionStore.fetchQuestion(1);

      expect(questionStore.question.likeUserIds.length).toBe(0);

      await questionStore.toggleLike(1);

      expect(questionStore.question.likeUserIds.length).toBe(1);
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

    context('when failed to create', () => {
      it('changes createStatus to failed', async () => {
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

  describe('modify', () => {
    context('when modified successfully', () => {
      it('changes modifyStatus to successful', async () => {
        await questionStore.fetchQuestion(1);

        const title = 'CORS 에러가 뜹니다.';
        const body = '서버 배포 후 CORS에러가 발생합니다.';
        const tags = new Set('Web');

        await questionStore.modify({
          title, body, tags,
        });

        expect(questionStore.isModifySuccessful).toBeTruthy();
      });
    });

    context('when failed to modify', () => {
      it('changes modifyStatus to failed', async () => {
        await questionStore.fetchQuestion(1);

        const title = 'CORS 에러가 뜹니다.';
        const body = '';
        const tags = new Set('Web');

        await questionStore.modify({
          title, body, tags,
        });

        expect(questionStore.isModifyFailed).toBeTruthy();
      });
    });
  });

  describe('adoptAnswer', () => {
    context('when adopted successfully', () => {
      it('changes adoptStatus to successful', async () => {
        const questionId = 1;
        const answerId = 1;
        const points = 20;
        const message = '감사합니다';

        await questionStore.adoptAnswer({
          questionId,
          answerId,
          points,
          message,
        });

        expect(questionStore.isAdoptSuccessful).toBeTruthy();
      });
    });

    context('when failed to adopt', () => {
      it('changes adoptStatus to failed', async () => {
        const questionId = 1;
        const answerId = 1;
        const points = 20000;
        const message = '감사합니다';

        await questionStore.adoptAnswer({
          questionId,
          answerId,
          points,
          message,
        });

        expect(questionStore.isAdoptFailed).toBeTruthy();
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

  describe('isMyQuestion', () => {
    context('when the question is mine', () => {
      it('returns true', async () => {
        const questionId = 1;
        const userId = 1;

        await questionStore.fetchQuestion(questionId);

        expect(questionStore.isMyQuestion(userId)).toBeTruthy();
      });
    });

    context('when the question is not mine', () => {
      it('returns false', async () => {
        const questionId = 1;
        const userId = 2;

        await questionStore.fetchQuestion(questionId);

        expect(questionStore.isMyQuestion(userId)).toBeFalsy();
      });
    });
  });
});
