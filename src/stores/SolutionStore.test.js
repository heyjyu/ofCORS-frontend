import SolutionStore from './SolutionStore';

describe('SolutionStore', () => {
  let solutionStore;

  beforeEach(() => {
    solutionStore = new SolutionStore();
  });

  describe('fetchSolutions', () => {
    it('loads solutions', async () => {
      await solutionStore.fetchSolutions({ sort: 'createdAt' });

      expect(solutionStore.solutions).toHaveLength(2);
    });
  });
});
