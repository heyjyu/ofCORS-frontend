import { useEffect } from 'react';
import styled from 'styled-components';
import Points from '../components/Points';
import useUserStore from '../hooks/useUserStore';

const Container = styled.main`
  width: 100%;
  height: calc(100vh - 3em);
  min-height: 50em;
`;

export default function ChargePage() {
  const userStore = useUserStore();

  useEffect(() => () => {
    userStore.fetchMe();
  }, []);

  return (
    <Container>
      <Points />
    </Container>
  );
}
