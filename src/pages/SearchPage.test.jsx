import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchPage from './SearchPage';

describe('SearchPage', () => {
  it('renders title', async () => {
    render((
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    ));

    await waitFor(() => {
      screen.getByText('검색 결과');
      screen.getByText('No \'Access-Control-Allow-Origin\'');
    });
  });
});
