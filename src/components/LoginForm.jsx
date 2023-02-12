import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useLoginFormStore from '../hooks/useLoginFormStore';
import useUserStore from '../hooks/useUserStore';
import Input from './ui/Input';

const Container = styled.div`
  width: 100%;

  label {
    display: block;
    margin-bottom: 0.5em;
    color: #A0A0A0;
  }
`;

const Title = styled.h1`
  font-size: 2.5em;
  font-weight: 700;
  width: 100%;
  margin-bottom: 1em;
  padding-block: 0.5em;
  border-bottom: 1px solid black;
  text-align: center;
`;

const Error = styled.p`
  font-size: 0.9em;
  margin-bottom: 2em;
  color: #FF424D;
`;

const Button = styled.button`
  font-weight: 700;
  width: 100%;
  height: 4em;
  padding: 0.5em 3em;
  border: 1px solid #AB92FF;
  border-radius: 0.25em;
  background: #BAA5FF;
  color: white;
`;

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const loginFormStore = useLoginFormStore();
  const { email, password } = loginFormStore.fields;

  const userStore = useUserStore();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const handleChangeUsername = (e) => {
    loginFormStore.changeEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    loginFormStore.changePassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    loginFormStore.validate();

    if (!loginFormStore.isValidateSuccessful) {
      return;
    }

    const accessToken = await userStore.login({ email, password });

    if (userStore.isLoginFailed) {
      return;
    }

    setAccessToken(accessToken);

    if (location.state?.previousPage === 'signUpPage') {
      navigate('/');

      return;
    }

    navigate(-1);
  };

  return (
    <Container>
      <Title>
        LOGIN
      </Title>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-email">
          이메일
        </label>
        <Input
          type="text"
          name="email"
          id="input-email"
          value={loginFormStore.fields.email || ''}
          error={loginFormStore.errors.email || userStore.isLoginFailed}
          onChange={handleChangeUsername}
        />
        <label htmlFor="input-password">
          비밀번호
        </label>
        <Input
          type="password"
          name="password"
          id="input-password"
          value={loginFormStore.fields.password || ''}
          error={loginFormStore.errors.password || userStore.isLoginFailed}
          onChange={handleChangePassword}
        />
        <Error>
          {loginFormStore.errorMessage
            ? loginFormStore.errorMessage
            : null}
          {userStore.isLoginFailed
            ? '이메일 혹은 비밀번호가 맞지 않습니다'
            : null}
        </Error>
        <Button type="submit">
          로그인
        </Button>
      </form>
    </Container>
  );
}
