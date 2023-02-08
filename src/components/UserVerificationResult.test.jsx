import {
  render, screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserVerificationResult from './UserVerificationResult';

describe('UserVerificationResult', () => {
  const renderUserVerificationResult = () => {
    render((
      <MemoryRouter initialEntries={['/verify-user/result']}>
        <UserVerificationResult />
      </MemoryRouter>
    ));
  };

  it('renders message', async () => {
    renderUserVerificationResult();

    screen.getByText(/실명인증/);
  });
});
