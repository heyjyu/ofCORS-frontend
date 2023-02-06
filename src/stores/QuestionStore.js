import { apiService } from '../services/ApiService';

import Store from './Store';

export default class QuestionStore extends Store {
  constructor() {
    super();

    this.reset();
  }

  async fetchQuestions({ sort, keyword = '' }) {
    this.startQuestionsLoad();

    try {
      const { questions } = await apiService.fetchQuestions({ sort, keyword });

      this.completeQuestionsLoad(questions);
    } catch (e) {
      this.failQuestionsLoad();
    }
  }

  async fetchQuestionPreviews({ userId = '', sort = '' }) {
    this.startQuestionPreviewsLoad();

    try {
      const { questionPreviews } = await apiService.fetchQuestionPreviews({ userId, sort });

      this.completeQuestionPreviewsLoad(questionPreviews);
    } catch (e) {
      this.failQuestionPreviewsLoad();
    }
  }

  async fetchQuestion(id) {
    this.startQuestionLoad();

    try {
      const question = await apiService.fetchQuestion(id);

      this.completeQuestionLoad(question);
    } catch (e) {
      this.failQuestionLoad();
    }
  }

  async fetchScrappedQuestions() {
    this.startScrappedQuestionsLoad();

    try {
      const { questions } = await apiService.fetchScrappedQuestions();

      this.completeScrappedQuestionsLoad(questions);
    } catch (e) {
      this.failScrappedQuestionsLoad();
    }
  }

  isMyQuestion(userId) {
    return this.question?.author.id === userId;
  }

  changeKeyword(keyword) {
    this.keyword = keyword;

    this.publish();
  }

  async create({
    title, body, tags, points,
  }) {
    this.startWrite();

    try {
      await apiService.createQuestion({
        title, body, tags, points,
      });

      this.completeWrite();
    } catch (e) {
      this.failWrite();
    }
  }

  async modify({
    title, body, tags,
  }) {
    this.startModify();

    try {
      await apiService.modifyQuestion({
        ...this.question,
        title,
        body,
        tags,
      });

      this.completeModify();
    } catch (e) {
      this.failModify();
    }
  }

  async delete(id) {
    this.startDelete();

    try {
      await apiService.deleteQuestion(id);
      this.questions = this.questions.filter((question) => question.id !== id);

      this.completeDelete();
    } catch (e) {
      this.failDelete();
    }
  }

  async scrap(id) {
    this.startScrap();

    try {
      const { scrapUserIds } = await apiService.scrapQuestion(id);
      this.question = { ...this.question, scrapUserIds };

      this.completeScrap();
    } catch (e) {
      this.failScrap();
    }
  }

  async cancelScrap(id) {
    this.startCancelScrap();

    try {
      const { scrapUserIds } = await apiService.cancelScrapQuestion(id);
      this.question = { ...this.question, scrapUserIds };

      this.completeCancelScrap();
    } catch (e) {
      this.failCancelScrap();
    }
  }

  async adoptAnswer({
    questionId,
    answerId,
    points,
    message,
  }) {
    this.startAdopt();

    try {
      await apiService.adoptAnswer({
        questionId,
        answerId,
      });

      await apiService.createAcknowledgement({
        questionId,
        answerId,
        points,
        message,
      });

      this.completeAdopt();
    } catch (e) {
      this.failAdopt();
    }
  }

  async toggleLike(id) {
    const likeUserIds = await apiService.toggleQuestionLike(id);

    this.question.likeUserIds = likeUserIds;

    this.publish();
  }

  startQuestionsLoad() {
    this.isQuestionsLoading = true;
    this.questions = [];
    this.publish();
  }

  completeQuestionsLoad(questions) {
    this.isQuestionsLoading = false;
    this.questions = questions;
    this.publish();
  }

  failQuestionsLoad() {
    this.isQuestionsLoading = false;
    this.questions = [];
    this.publish();
  }

  startQuestionPreviewsLoad() {
    this.isQuestionPreviewsLoading = true;
    this.questionPreviews = [];
    this.publish();
  }

  completeQuestionPreviewsLoad(questionPreviews) {
    this.isQuestionPreviewsLoading = false;
    this.questionPreviews = questionPreviews;
    this.publish();
  }

  failQuestionPreviewsLoad() {
    this.isQuestionPreviewsLoading = false;
    this.questionPreviews = [];
    this.publish();
  }

  startQuestionLoad() {
    this.isQuestionLoading = true;
    this.question = null;
    this.publish();
  }

  completeQuestionLoad(question) {
    this.isQuestionLoading = false;
    this.question = question;
    this.publish();
  }

  failQuestionLoad() {
    this.isQuestionLoading = false;
    this.question = null;
    this.publish();
  }

  startScrappedQuestionsLoad() {
    this.isScrappedQuestionsLoading = true;
    this.scrappedQuestions = [];
    this.publish();
  }

  completeScrappedQuestionsLoad(questions) {
    this.isScrappedQuestionsLoading = false;
    this.scrappedQuestions = questions;
    this.publish();
  }

  failScrappedQuestionsLoad() {
    this.isScrappedQuestionsLoading = false;
    this.scrappedQuestions = [];
    this.publish();
  }

  startWrite() {
    this.createStatus = 'processing';
    this.publish();
  }

  completeWrite() {
    this.createStatus = 'successful';
    this.publish();
  }

  failWrite() {
    this.createStatus = 'failed';
    this.publish();
  }

  startModify() {
    this.modifyStatus = 'processing';
    this.publish();
  }

  completeModify() {
    this.modifyStatus = 'successful';
    this.publish();
  }

  failModify() {
    this.modifyStatus = 'failed';
    this.publish();
  }

  startDelete() {
    this.deleteStatus = 'processing';
    this.publish();
  }

  completeDelete() {
    this.deleteStatus = 'successful';
    this.publish();
  }

  failDelete() {
    this.deleteStatus = 'failed';
    this.publish();
  }

  startScrap() {
    this.scrapStatus = 'processing';
    this.publish();
  }

  completeScrap() {
    this.scrapStatus = 'successful';
    this.publish();
  }

  failScrap() {
    this.scrapStatus = 'failed';
    this.publish();
  }

  startCancelScrap() {
    this.cancelScrapStatus = 'processing';
    this.publish();
  }

  completeCancelScrap() {
    this.cancelScrapStatus = 'successful';
    this.publish();
  }

  failCancelScrap() {
    this.cancelScrapStatus = 'failed';
    this.publish();
  }

  startAdopt() {
    this.adoptStatus = 'processing';
    this.publish();
  }

  completeAdopt() {
    this.adoptStatus = 'successful';
    this.publish();
  }

  failAdopt() {
    this.adoptStatus = 'failed';
    this.publish();
  }

  reset() {
    this.isQuestionsLoading = false;
    this.isQuestionLoading = false;
    this.isQuestionPreviewsLoading = false;
    this.isScrappedQuestionsLoading = false;
    this.questions = [];
    this.questionPreviews = [];
    this.scrappedQuestions = [];
    this.question = null;
    this.keyword = '';
    this.createStatus = '';
    this.modifyStatus = '';
    this.deleteStatus = '';
    this.adoptStatus = '';
    this.scrapStatus = '';
    this.cancelScrapStatus = '';
  }

  get isCreateSuccessful() {
    return this.createStatus === 'successful';
  }

  get isCreateFailed() {
    return this.createStatus === 'failed';
  }

  get isModifySuccessful() {
    return this.modifyStatus === 'successful';
  }

  get isModifyFailed() {
    return this.modifyStatus === 'failed';
  }

  get isDeleteSuccessful() {
    return this.deleteStatus === 'successful';
  }

  get isDeleteFailed() {
    return this.deleteStatus === 'failed';
  }

  get isScrapSuccessful() {
    return this.scrapStatus === 'successful';
  }

  get isScrapFailed() {
    return this.scrapStatus === 'failed';
  }

  get isCancelScrapSuccessful() {
    return this.cancelScrapStatus === 'successful';
  }

  get isCancelScrapFailed() {
    return this.cancelScrapStatus === 'failed';
  }

  get isAdoptSuccessful() {
    return this.adoptStatus === 'successful';
  }

  get isAdoptFailed() {
    return this.adoptStatus === 'failed';
  }
}

export const questionStore = new QuestionStore();
