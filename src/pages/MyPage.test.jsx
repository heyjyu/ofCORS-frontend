import {
  act, render, screen, waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { userStore } from '../stores/UserStore';
import MyPage from './MyPage';

const context = describe;

describe('MyPage', () => {
  const renderMyPage = () => render((
    <MemoryRouter initialEntries={['/mypage']}>
      <MyPage />
    </MemoryRouter>
  ));

  context('without login', () => {
    it('renders error message', async () => {
      await act(() => {
        renderMyPage();
      });

      screen.getByText('잘못된 접근입니다.');
    });
  });

  it('renders name', async () => {
    localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));

    await userStore.fetchMe();

    await act(() => {
      renderMyPage();
    });

    await waitFor(() => {
      screen.getByText('hong');
    });
  });
});
