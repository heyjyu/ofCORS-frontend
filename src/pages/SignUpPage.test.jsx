import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignUpPage from './SignUpPage';

describe('SignUpPage', () => {
  it('renders signup button', () => {
    render((
      <MemoryRouter initialEntries={['/signup']}>
        <SignUpPage />
      </MemoryRouter>
    ));

    screen.getByText('회원가입');
  });
});
