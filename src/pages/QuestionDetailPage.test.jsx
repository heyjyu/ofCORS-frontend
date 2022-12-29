import {
  act, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { questionStore } from '../stores/QuestionStore';
import QuestionDetailPage from './QuestionDetailPage';

describe('QuestionDetailPage', () => {
  it('renders title', async () => {
    localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));

    const id = 1;

    await questionStore.fetchQuestion(id);

    await act(() => render((
      <MemoryRouter initialEntries={[`/questions/${id}`]}>
        <QuestionDetailPage />
      </MemoryRouter>
    )));

    await waitFor(() => {
      screen.getByText(/서버 배포 후 CORS에러가 발생합니다./);
    });
  });
});
