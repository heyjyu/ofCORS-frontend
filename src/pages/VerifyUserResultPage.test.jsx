import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import VerifyUserResultPage from './VerifyUserResultPage';

jest.mock('query-string', () => jest.fn());

describe('VerifyUserResultPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders message', async () => {
    render((
      <MemoryRouter initialEntries={['/verify-user/result']}>
        <VerifyUserResultPage />
      </MemoryRouter>
    ));

    await waitFor(() => {
      screen.getByText(/실명인증/);
    });
  });
});
