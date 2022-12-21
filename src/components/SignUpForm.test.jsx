import {
  render, fireEvent, screen, waitFor,
} from '@testing-library/react';
import { userStore } from '../stores/UserStore';
import SignUpForm from './SignUpForm';

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

describe('SignUpForm', () => {
  function renderSignUpForm() {
    render((
      <SignUpForm />
    ));
  }

  beforeEach(() => {
    userStore.resetSignUpStatus();
  });

  context('when successfully signed up', () => {
    it('renders a button that navigates to the login page', async () => {
      renderSignUpForm();

      fireEvent.change(screen.getByLabelText('닉네임'), {
        target: { value: 'joo' },
      });

      fireEvent.change(screen.getByLabelText('이메일'), {
        target: { value: 'test@example.com' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호'), {
        target: { value: 'Abcdef1!' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인'), {
        target: { value: 'Abcdef1!' },
      });

      fireEvent.click(screen.getByText('회원가입'));

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/login');
      });
    });
  });

  context('with empty display name', () => {
    it('renders error message', async () => {
      renderSignUpForm();

      fireEvent.change(screen.getByLabelText('닉네임'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('이메일'), {
        target: { value: 'test@example.com' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호'), {
        target: { value: 'Abcdef1!' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인'), {
        target: { value: 'Abcdef1!' },
      });

      await waitFor(() => {
        screen.getByText(/닉네임을 입력해주세요/);
      });
    });
  });

  context('with empty email', () => {
    it('renders error message', async () => {
      renderSignUpForm();

      fireEvent.change(screen.getByLabelText('닉네임'), {
        target: { value: 'joo' },
      });

      fireEvent.change(screen.getByLabelText('이메일'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호'), {
        target: { value: 'Abcdef1!' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인'), {
        target: { value: 'Abcdef1!' },
      });

      await waitFor(() => {
        screen.getByText(/이메일을 입력해주세요/);
      });
    });
  });

  context('with empty password', () => {
    it('renders error message', async () => {
      renderSignUpForm();

      fireEvent.change(screen.getByLabelText('닉네임'), {
        target: { value: 'joo' },
      });

      fireEvent.change(screen.getByLabelText('이메일'), {
        target: { value: 'test@example.com' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인'), {
        target: { value: 'Abcdef1!' },
      });

      await waitFor(() => {
        screen.getByText(/비밀번호를 입력해주세요/);
      });
    });
  });

  context('with empty passwordCheck', () => {
    it('renders error message', async () => {
      renderSignUpForm();

      fireEvent.change(screen.getByLabelText('닉네임'), {
        target: { value: 'joo' },
      });

      fireEvent.change(screen.getByLabelText('이메일'), {
        target: { value: 'test@example.com' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호'), {
        target: { value: 'Abcdef1!' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인'), {
        target: { value: '' },
      });

      await waitFor(() => {
        screen.getByText(/비밀번호를 입력해주세요/);
      });
    });
  });
});
