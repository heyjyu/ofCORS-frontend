import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import VerifyUserPage from './VerifyUserPage';

jest.mock('query-string', () => jest.fn());

describe('VerifyUserPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title', async () => {
    render((
      <MemoryRouter initialEntries={['/verify-user']}>
        <VerifyUserPage />
      </MemoryRouter>
    ));

    await waitFor(() => {
      screen.getByText('실명 인증하기');
    });
  });
});
