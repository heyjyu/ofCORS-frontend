import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { selectAnswerFormStore } from '../stores/SelectAnswerFormStore';
import AdoptPage from './AdoptPage';

const context = describe;

describe('AdoptPage', () => {
  const renderAdoptPage = () => {
    render((
      <MemoryRouter initialEntries={['/questions/1/adopt']}>
        <Routes>
          <Route path="/questions/:id/adopt" element={<AdoptPage />} />
        </Routes>
      </MemoryRouter>
    ));
  };

  context('without login', () => {
    it('renders error message', () => {
      renderAdoptPage();

      screen.getByText('잘못된 접근입니다.');
    });
  });

  context('without selected answer', () => {
    it('doesn\'t render title', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));

      renderAdoptPage();

      await waitFor(() => {
        expect(screen.queryByText('답변 채택하기')).toBeNull();
      });
    });
  });

  context('with answer of other question', () => {
    it('renders error message', async () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));
      selectAnswerFormStore.selectAnswerId(2);

      await act(() => {
        renderAdoptPage();
      });

      screen.getByText('잘못된 접근입니다.');
    });
  });

  it('renders title', async () => {
    localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));
    selectAnswerFormStore.selectAnswerId(1);

    renderAdoptPage();

    await waitFor(() => {
      screen.getByText('답변 채택하기');
    });
  });
});
