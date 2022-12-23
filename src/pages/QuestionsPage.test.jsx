import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import QuestionsPage from './QuestionsPage';

describe('QuestionsPage', () => {
  it('renders title', async () => {
    render((
      <MemoryRouter initialEntries={['/questions']}>
        <QuestionsPage />
      </MemoryRouter>
    ));

    await waitFor(() => {
      screen.getByText('모든 질문');
    });
  });
});
