import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useSignUpFormStore from '../hooks/useSignUpFormStore';
import useUserStore from '../hooks/useUserStore';
import Input from './ui/Input';

const Container = styled.div`
  width: 30em;

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

export default function SignUpForm() {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const signUpFormStore = useSignUpFormStore();

  const {
    displayName, email, password,
  } = signUpFormStore.fields;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signUpFormStore.validate();

    if (signUpFormStore.isValidateSuccessful) {
      await userStore.signUp({
        displayName, email, password,
      });
    }
  };

  useEffect(() => {
    if (userStore.isSignUpSuccessful) {
      navigate('/login', { state: { previousPage: 'signUpPage' } });
    }
  }, [userStore.isSignUpSuccessful]);

  return (
    <Container>
      <Title>
        SIGN UP
      </Title>
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-display-name">
          닉네임
        </label>
        <Input
          name="display-name"
          type="text"
          value={signUpFormStore.fields.displayName || ''}
          onChange={(e) => signUpFormStore.changeDisplayName(e.target.value)}
          placeholder="3자 이상 입력해주세요"
          errorMessage={signUpFormStore.errors.displayName}
        />
        <label htmlFor="input-email">
          이메일
        </label>
        <Input
          name="email"
          type="email"
          value={signUpFormStore.fields.email || ''}
          onChange={(e) => signUpFormStore.changeEmail(e.target.value)}
          errorMessage={signUpFormStore.errors.email}
        />
        <label htmlFor="input-password">
          비밀번호
        </label>
        <Input
          name="password"
          type="password"
          value={signUpFormStore.fields.password || ''}
          onChange={(e) => signUpFormStore.changePassword(e.target.value)}
          placeholder="8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함"
          errorMessage={signUpFormStore.errors.password}
        />
        <label htmlFor="input-password-check">
          비밀번호 확인
        </label>
        <Input
          name="password-check"
          type="password"
          value={signUpFormStore.fields.passwordCheck || ''}
          onChange={(e) => signUpFormStore.changePasswordCheck(e.target.value)}
          errorMessage={signUpFormStore.errors.passwordCheck}
        />
        <Button type="submit">
          회원가입
        </Button>
      </form>
    </Container>
  );
}
