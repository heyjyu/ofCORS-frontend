import { useEffect } from 'react';
import styled from 'styled-components';
import Navigator from '../components/Navigator';
import Users from '../components/Users';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
`;

const LeftSideBar = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  flex: 1;
`;

export default function UsersPage() {
  const userStore = useUserStore();

  useEffect(() => {
    userStore.fetchUsers({ sort: 'like' });
  }, []);

  return (
    <Container>
      <LeftSideBar>
        <Navigator />
      </LeftSideBar>
      <Wrapper>
        <Users />
      </Wrapper>
    </Container>
  );
}
