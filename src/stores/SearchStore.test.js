import SearchStore from './SearchStore';

describe('SearchStore', () => {
  let searchStore;

  beforeEach(() => {
    searchStore = new SearchStore();
  });

  describe('changeKeyword', () => {
    it('changes keyword', () => {
      searchStore.changeKeyword('CORS');

      expect(searchStore.keyword).toBe('CORS');
    });
  });

  describe('fetchResults', () => {
    it('loads results', async () => {
      await searchStore.fetchResults({ keyword: 'CORS' });

      expect(searchStore.results).toHaveLength(2);
    });
  });
});
