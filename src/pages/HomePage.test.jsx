import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders message', () => {
    render((
      <MemoryRouter initialEntries={['/']}>
        <HomePage />
      </MemoryRouter>
    ));

    screen.getByText('인기 질문');
  });
});
