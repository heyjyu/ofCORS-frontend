import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders title', async () => {
    render((
      <MemoryRouter initialEntries={['/']}>
        <HomePage />
      </MemoryRouter>
    ));

    await waitFor(() => {
      screen.getByText('인기 질문');
    });
  });
});
