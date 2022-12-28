import {
  render, screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { searchStore } from '../stores/SearchStore';
import SearchResults from './SearchResults';

const context = describe;

describe('SearchResults', () => {
  function renderSearchResults() {
    render((
      <MemoryRouter initialEntries={['/search']}>
        <SearchResults />
      </MemoryRouter>
    ));
  }

  context('without result', () => {
    it('renders "검색 결과를 찾지 못했습니다" message', () => {
      searchStore.isResultsLoading = false;
      searchStore.results = [];
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
