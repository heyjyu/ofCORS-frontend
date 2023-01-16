import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UsersPage from './UsersPage';

describe('UsersPage', () => {
  it('renders title', async () => {
    render((
      <MemoryRouter initialEntries={['/users']}>
        <UsersPage />
      </MemoryRouter>
    ));

    await waitFor(() => {
      screen.getByRole('heading', { name: '사람들' });
    });
  });
});
