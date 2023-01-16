import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { userStore } from '../stores/UserStore';
import UserDetailPage from './UserDetailPage';

describe('UserDetailPage', () => {
  it('renders name', async () => {
    await userStore.fetchUser(1);

    render((
      <MemoryRouter initialEntries={['/users/1']}>
        <UserDetailPage />
      </MemoryRouter>
    ));

    await waitFor(() => {
      screen.getByText('hong');
    });
  });
});
