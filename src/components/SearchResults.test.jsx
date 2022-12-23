import {
  render, screen,
} from '@testing-library/react';
import { searchStore } from '../stores/SearchStore';
import SearchResults from './SearchResults';

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/prop-types
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
}));

const context = describe;

describe('SearchResults', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderSearchResults() {
    render((
      <SearchResults />
    ));
  }

  context('without result', () => {
    it('renders "검색 결과를 찾지 못했습니다" message', () => {
      searchStore.fields.isResultsLoaded = true;
      searchStore.fields.results = [];
      renderSearchResults({ keyword: '존재하지 않는 검색어' });

      screen.getByText(/검색 결과를 찾지 못했습니다/);
    });
  });

  context('with result', () => {
    it('renders title', async () => {
      await searchStore.fetchResults({ keyword: 'CORS' });
      renderSearchResults();

      screen.getByText(/Access-Control-Allow-Origin/);
    });
  });
});
