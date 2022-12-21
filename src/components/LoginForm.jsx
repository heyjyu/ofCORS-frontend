import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useLoginFormStore from '../hooks/useLoginFormStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  width: 20em;
`;

const Label = styled.label`
  color: #666666;
`;

const Input = styled.input`
  font-size: 1em;
  font-weight: 400;
  width: 100%;
  height: 3.75em;
  margin-block: 1em;
  padding: 1em;
  border: ${(props) => (`1px solid${props.error ? '#FF424D' : '#D8D8D8'}`)};
  color: #666666;

  :focus {
    font-size: 1em;
    border: ${(props) => (`1px solid${props.error ? '#FF424D' : '#22DAAB'}`)};
    outline: none;
    color: #666666;
  }
`;

export default function LoginForm() {
  const navigate = useNavigate();

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

    navigate(-1);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="input-email">
          이메일
        </Label>
        <Input
          type="text"
          name="email"
          id="input-email"
          label="이메일"
          value={loginFormStore.fields.email || ''}
          error={loginFormStore.errors.email || userStore.isLoginFailed}
          onChange={handleChangeUsername}
        />
        <Label htmlFor="input-password">
          비밀번호
        </Label>
        <Input
          type="password"
          name="password"
          id="input-password"
          value={loginFormStore.fields.password || ''}
          error={loginFormStore.errors.password || userStore.isLoginFailed}
          onChange={handleChangePassword}
        />
        <p>
          {loginFormStore.errorMessage
            ? loginFormStore.errorMessage
            : null}
          {userStore.isLoginFailed
            ? '이메일 혹은 비밀번호가 맞지 않습니다'
            : null}
        </p>
        <button type="submit">
          로그인
        </button>
      </form>
    </Container>
  );
}
