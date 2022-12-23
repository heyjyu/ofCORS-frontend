import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchPage from './SearchPage';

describe('SearchPage', () => {
  it('renders message', async () => {
    render((
      <MemoryRouter initialEntries={['/']}>
        <SearchPage />
      </MemoryRouter>
    ));

    await waitFor(() => {
      screen.getByText('검색 결과');
    });
  });
});
