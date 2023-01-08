import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import QuestionEditPage from './QuestionEditPage';

const context = describe;

describe('QuestionEditPage', () => {
  const renderQuestionEditPage = () => {
    render((
      <MemoryRouter initialEntries={['/questions/1/adopt']}>
        <Routes>
          <Route path="/questions/:id/adopt" element={<QuestionEditPage />} />
        </Routes>
      </MemoryRouter>
    ));
  };

  context('without login', () => {
    it('renders error message', async () => {
      await act(() => {
        renderQuestionEditPage();
      });

      screen.getByText('잘못된 접근입니다.');
    });
  });

  it('renders title', async () => {
    localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));

    await act(() => {
      renderQuestionEditPage();
    });

    await waitFor(() => {
      screen.getByText('질문 수정하기');
    });
  });
});
