import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { questionStore } from '../stores/QuestionStore';
import QuestionDetailPage from './QuestionDetailPage';

describe('QuestionDetailPage', () => {
  it('renders title', async () => {
    const id = 1;

    await questionStore.fetchQuestion(id);

    render((
      <MemoryRouter initialEntries={[`/questions/${id}`]}>
        <QuestionDetailPage />
      </MemoryRouter>
    ));

    await waitFor(() => {
      screen.getByText(/CORS에러가 발생합니다./);
    });
  });
});
