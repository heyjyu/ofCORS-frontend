import { useEffect } from 'react';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import useLoginFormStore from '../hooks/useLoginFormStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  display: flex;
  position: relative;
  width: 20em;
`;

const Wrapper = styled.div`
  flex: 1;
`;

export default function LoginPage() {
  const userStore = useUserStore();
  const loginFormStore = useLoginFormStore();

  useEffect(() => () => {
    userStore.resetLoginStatus();
    loginFormStore.reset();
  }, []);

  return (
    <Container>
      <Wrapper>
        <LoginForm />
      </Wrapper>
    </Container>
  );
}
