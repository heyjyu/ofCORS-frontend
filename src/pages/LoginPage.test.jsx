import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

describe('LoginPage', () => {
  it('renders login button', () => {
    render((
      <MemoryRouter initialEntries={['/login']}>
        <LoginPage />
      </MemoryRouter>
    ));

    screen.getByText('로그인');
  });
});
