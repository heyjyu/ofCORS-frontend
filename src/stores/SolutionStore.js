import { apiService } from '../services/ApiService';

import Store from './Store';

export default class SolutionStore extends Store {
  constructor() {
    super();

    this.isSolutionsLoaded = false;
    this.solutions = [];
  }

  async fetchSolutions({ sort }) {
    this.isSolutionsLoaded = false;

    this.publish();

    const { solutions } = await apiService.fetchSolutions({ sort });

    this.solutions = solutions;

    this.isSolutionsLoaded = true;

    this.publish();
  }
}

export const solutionStore = new SolutionStore();
