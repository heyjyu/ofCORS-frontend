import { useEffect } from 'react';
import styled from 'styled-components';
import SignUpForm from '../components/SignUpForm';
import useSignUpFormStore from '../hooks/useSignUpFormStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  min-width: 1024px;
  height: calc(100vh - 3em);
  min-height: 50em;
  margin: 0 auto;
`;

export default function SignUpPage() {
  const userStore = useUserStore();
  const signUpFormStore = useSignUpFormStore();

  useEffect(() => () => {
    userStore.resetSignUpStatus();
    signUpFormStore.reset();
  }, []);

  return (
    <Container>
      <SignUpForm />
    </Container>
  );
}
