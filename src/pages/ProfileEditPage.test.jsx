import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProfileEditPage from './ProfileEditPage';

const context = describe;

describe('ProfileEditPage', () => {
  const renderProfileEditPage = () => {
    render((
      <MemoryRouter initialEntries={['/mypage/modify']}>
        <Routes>
          <Route path="/mypage/modify" element={<ProfileEditPage />} />
        </Routes>
      </MemoryRouter>
    ));
  };

  context('without login', () => {
    it('renders error message', async () => {
      await act(() => {
        renderProfileEditPage();
      });

      screen.getByText('잘못된 접근입니다.');
    });
  });

  it('renders title', async () => {
    localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));

    await act(() => {
      renderProfileEditPage();
    });

    await waitFor(() => {
      screen.getByText('프로필 수정');
    });
  });
});
