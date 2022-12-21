import { useEffect } from 'react';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import useLoginFormStore from '../hooks/useLoginFormStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.main`
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

export default function LoginPage() {
  const userStore = useUserStore();
  const loginFormStore = useLoginFormStore();

  useEffect(() => () => {
    userStore.resetLoginStatus();
    loginFormStore.reset();
  }, []);

  return (
    <Container>
      <LoginForm />
    </Container>
  );
}
