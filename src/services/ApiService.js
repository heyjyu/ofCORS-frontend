import axios from 'axios';
import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  constructor() {
    this.accessToken = '';

    this.instance = axios.create({
      baseURL: baseUrl,
    });
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;

    if (accessToken) {
      this.instance = axios.create({
        baseURL: baseUrl,
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });

      return;
    }

    this.instance = axios.create({
      baseURL: baseUrl,
    });
  }

  async countUser(email) {
    const { data } = await this.instance.get(`/users?countOnly=true&email=${email}`);

    return data.count;
  }

  async createUser({
    displayName, email, password,
  }) {
    const { data } = await this.instance.post('/users', {
      displayName, email, password,
    });

    return {
      id: data.id,
    };
  }

  async fetchMe() {
    const { data } = await this.instance.get('/users/me');

    return {
      id: data.id,
      displayName: data.displayName,
      about: data.about,
      points: data.points,
      realName: data.realName,
      imageUrl: data.imageUrl,
    };
  }

  async postSession({
    email, password,
  }) {
    const { data } = await this.instance.post('/session', {
      email, password,
    });

    return {
      accessToken: data.accessToken,
    };
  }

  async fetchTopQuestions({ period = 'week' }) {
    const { data } = await this.instance.get(`/questions?sort=like&status=open&period=${period}&size=20`);

    return {
      questions: data.questions,
    };
  }

  async fetchSearchResults({ keyword }) {
    const { data } = await this.instance.get(`/questions?sort=like&status=closed&keyword=${keyword}&size=20`);

    return {
      questions: data.questions,
    };
  }

  async fetchQuestions({ sort, keyword }) {
    const { data } = await this.instance.get(`/questions?status=open&sort=${sort}&keyword=${keyword}&size=20`);

    return {
      questions: data.questions,
    };
  }

  async fetchQuestion(id) {
    const { data } = await this.instance.get(`/questions/${id}`);

    return data;
  }

  async toggleQuestionLike(id) {
    const { data } = await this.instance.patch(`/questions/${id}/likeUserIds`);

    return data.likeUserIds;
  }

  async fetchSolutions({ sort }) {
    const { data } = await this.instance.get(`/questions?status=closed&sort=${sort}&size=20`);

    return {
      solutions: data.questions,
    };
  }

  async fetchAnswers({ questionId }) {
    const { data } = await this.instance.get(`/answers?questionId=${questionId}`);

    return {
      answers: data.answers,
    };
  }

  async fetchAnswer(id) {
    const { data } = await this.instance.get(`/answers/${id}`);

    return data;
  }

  async toggleAnswerLike(id) {
    const { data } = await this.instance.patch(`/answers/${id}/likeUserIds`);

    return data.likeUserIds;
  }

  async createQuestion({
    title, body, tags, points,
  }) {
    const { data } = await this.instance.post('/questions', {
      title, body, tags: [...tags], points,
    });

    return {
      id: data.id,
    };
  }

  async modifyQuestion(question) {
    const { data } = await this.instance.put(`/questions/${question.id}`, {
      ...question, tags: [...question.tags],
    });

    return {
      id: data.id,
    };
  }

  async deleteQuestion(id) {
    await this.instance.delete(`/questions/${id}`);
  }

  async createAnswer({
    questionId, body,
  }) {
    const { data } = await this.instance.post('/answers', {
      questionId, body,
    });

    return {
      id: data.id,
    };
  }

  async adoptAnswer({
    questionId,
    answerId,
  }) {
    await this.instance.patch(`/questions/${questionId}`, {
      answerId,
    });
  }

  async modifyAnswer({
    answerId,
    body,
  }) {
    await this.instance.patch(`/answers/${answerId}`, {
      body,
    });
  }

  async createAcknowledgement({
    questionId,
    answerId,
    points,
    message,
  }) {
    await this.instance.post('/acknowledgements', {
      questionId,
      answerId,
      message,
      points,
    });
  }
}

export const apiService = new ApiService();
