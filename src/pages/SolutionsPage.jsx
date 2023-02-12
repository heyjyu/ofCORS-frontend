import { useEffect } from 'react';
import styled from 'styled-components';
import Navigator from '../components/Navigator';
import Solutions from '../components/Solutions';
import useSolutionStore from '../hooks/useSolutionStore';

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

export default function SolutionsPage() {
  const solutionStore = useSolutionStore();

  useEffect(() => {
    solutionStore.fetchSolutions({ sort: 'createdAt' });
  }, []);

  return (
    <Container>
      <LeftSideBar>
        <Navigator />
      </LeftSideBar>
      <Wrapper>
        <Solutions />
      </Wrapper>
    </Container>
  );
}
