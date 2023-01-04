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

  async fetchQuestion(id) {
    this.startQuestionLoad();

    try {
      const question = await apiService.fetchQuestion(id);

      this.completeQuestionLoad(question);
    } catch (e) {
      this.failQuestionLoad();
    }
  }

  isMyQuestion(userId) {
    return this.question.author.id === userId;
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

  startWrite() {
    this.createStatus = 'processing';
  }

  completeWrite() {
    this.createStatus = 'successful';
  }

  failWrite() {
    this.createStatus = 'failed';
  }

  startAdopt() {
    this.adoptStatus = 'processing';
  }

  completeAdopt() {
    this.adoptStatus = 'successful';
  }

  failAdopt() {
    this.adoptStatus = 'failed';
  }

  reset() {
    this.isQuestionsLoading = false;
    this.isQuestionLoading = false;
    this.questions = [];
    this.question = null;
    this.keyword = '';
    this.createStatus = '';
  }

  get isCreateSuccessful() {
    return this.createStatus === 'successful';
  }

  get isCreateFailed() {
    return this.createStatus === 'failed';
  }

  get isAdoptSuccessful() {
    return this.adoptStatus === 'successful';
  }

  get isAdoptFailed() {
    return this.adoptStatus === 'failed';
  }
}

export const questionStore = new QuestionStore();
