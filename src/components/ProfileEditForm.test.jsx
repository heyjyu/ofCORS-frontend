import {
  render, fireEvent, screen, waitFor,
} from '@testing-library/react';
import { userStore } from '../stores/UserStore';
import ProfileEditForm from './ProfileEditForm';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/prop-types
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate() {
    return navigate;
  },
}));

describe('ProfileEditForm', () => {
  function renderProfileEditForm() {
    render((
      <ProfileEditForm />
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
    userStore.resetEditStatus();
  });

  context('when successfully edited', () => {
    it('renders a button that navigates to my page', async () => {
      renderProfileEditForm();

      fireEvent.change(screen.getByLabelText('닉네임'), {
        target: { value: 'hong' },
      });

      fireEvent.change(screen.getByLabelText('한 줄 소개'), {
        target: { value: '저는 도커를 좋아합니다' },
      });

      fireEvent.click(screen.getByText('저장'));

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/mypage');
      });
    });
  });

  context('with empty display name', () => {
    it('renders error message', async () => {
      renderProfileEditForm();

      fireEvent.change(screen.getByLabelText('닉네임'), {
        target: { value: '' },
      });

      await waitFor(() => {
        screen.getByText(/닉네임을 입력해주세요/);
      });
    });
  });
});
