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

  async fetchTopQuestions() {
    const { data } = await this.instance.get('/questions?filter=top');

    return {
      questions: data.questions,
    };
  }
}

export const apiService = new ApiService();
