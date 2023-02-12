import { useEffect } from 'react';
import styled from 'styled-components';
import SignUpForm from '../components/SignUpForm';
import useSignUpFormStore from '../hooks/useSignUpFormStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  display: flex;
  position: relative;
  width: 30em;
`;

const Wrapper = styled.div`
  flex: 1;
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
      <Wrapper>
        <SignUpForm />
      </Wrapper>
    </Container>
  );
}
