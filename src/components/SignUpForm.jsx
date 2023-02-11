import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useSignUpFormStore from '../hooks/useSignUpFormStore';
import useUserStore from '../hooks/useUserStore';
import Input from './ui/Input';

const Container = styled.div`
  width: 30em;
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="input-display-name">
          닉네임
        </label>
        <Input
          name="display-name"
          type="text"
          value={signUpFormStore.fields.displayName || ''}
          onChange={(e) => signUpFormStore.changeDisplayName(e.target.value)}
          message="3자 이상 입력해주세요"
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
          message="8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함"
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
        <button type="submit">
          회원가입
        </button>
      </form>
    </Container>
  );
}
