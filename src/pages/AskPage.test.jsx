import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AskPage from './AskPage';

describe('AskPage', () => {
  it('renders title', async () => {
    render((
      <MemoryRouter initialEntries={['/ask']}>
        <AskPage />
      </MemoryRouter>
    ));

    await waitFor(() => {
      screen.getByText('질문하기');
      screen.getByText('보유 포인트: 100');
    });
  });
});
