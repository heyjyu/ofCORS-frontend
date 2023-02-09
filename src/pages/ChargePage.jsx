import { useEffect } from 'react';
import styled from 'styled-components';
import Points from '../components/Points';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  width: 100%;
  height: 100%;
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
