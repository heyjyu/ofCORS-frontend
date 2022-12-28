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
    }
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

  async fetchUser() {
    const { data } = await this.instance.get('/users/me');

    return {
      points: data.points,
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

  async fetchSolutions({ sort }) {
    const { data } = await this.instance.get(`/questions?status=closed&sort=${sort}&size=20`);

    return {
      solutions: data.questions,
    };
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
}

export const apiService = new ApiService();
