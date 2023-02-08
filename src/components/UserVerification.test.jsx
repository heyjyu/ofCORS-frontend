import {
  render, screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserVerification from './UserVerification';

jest.mock('query-string', () => jest.fn());

describe('UserVerification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderUserVerification = () => {
    render((
      <MemoryRouter initialEntries={['/verify-user']}>
        <UserVerification />
      </MemoryRouter>
    ));
  };

  it('renders title', async () => {
    renderUserVerification();

    screen.getByText('실명 인증하기');
  });
});
