import { apiService } from '../services/ApiService';

import Store from './Store';

export default class SolutionStore extends Store {
  constructor() {
    super();

    this.isSolutionsLoading = false;
    this.solutions = [];
  }

  async fetchSolutions({ sort }) {
    this.startLoad();

    try {
      const { solutions } = await apiService.fetchSolutions({ sort });

      this.completeLoad(solutions);
    } catch (e) {
      this.failLoad();
    }
  }

  startLoad() {
    this.isQuestionsLoading = true;
    this.solutions = [];
    this.publish();
  }

  completeLoad(solutions) {
    this.isQuestionsLoading = false;
    this.solutions = solutions;
    this.publish();
  }

  failLoad() {
    this.isQuestionsLoading = false;
    this.solutions = [];
    this.publish();
  }
}

export const solutionStore = new SolutionStore();
