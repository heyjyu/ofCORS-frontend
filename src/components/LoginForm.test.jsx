import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import LoginForm from './LoginForm';

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
  useLocation() {
    return {
      state: {
        previousPage: '',
      },
    };
  },
}));

const context = describe;

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderLoginForm() {
    render((
      <LoginForm />
    ));
  }

  context('with correct email and password', () => {
    it('navigates to previous page', async () => {
      renderLoginForm();

      fireEvent.change(screen.getByLabelText('이메일'), {
        target: { value: 'test@example.com' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호'), {
        target: { value: 'Abcdef1!' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인' }));

      await waitFor(() => {
        expect(navigate).toBeCalledWith(-1);
      });
    });
  });

  context('when email field is not filled', () => {
    it('renders error message', async () => {
      renderLoginForm();

      fireEvent.change(screen.getByLabelText('이메일'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호'), {
        target: { value: 'Abcdef1!' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인' }));

      await waitFor(() => {
        screen.getByText('이메일을 입력해주세요');
      });
    });
  });

  context('when password field is not filled', () => {
    it('renders error message', async () => {
      renderLoginForm();

      fireEvent.change(screen.getByLabelText('이메일'), {
        target: { value: 'test@example.com' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호'), {
        target: { value: '' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인' }));

      await waitFor(() => {
        screen.getByText('비밀번호를 입력해주세요');
      });
    });
  });

  context('with incorrect email and password', () => {
    it('renders error message', async () => {
      renderLoginForm();

      fireEvent.change(screen.getByLabelText('이메일'), {
        target: { value: 'wrong@email.com' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호'), {
        target: { value: 'Abcdef1!' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인' }));

      await waitFor(() => {
        screen.getByText('이메일 혹은 비밀번호가 맞지 않습니다');
      });
    });
  });
});
