import { useEffect } from 'react';
import styled from 'styled-components';
import Navigator from '../components/Navigator';
import TopQuestions from '../components/TopQuestions';
import useTopQuestionStore from '../hooks/useTopQuestionStore';

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

export default function HomePage() {
  const topQuestionStore = useTopQuestionStore();

  useEffect(() => {
    topQuestionStore.fetchQuestions({ period: 'week' });
  }, []);

  return (
    <Container>
      <LeftSideBar>
        <Navigator />
      </LeftSideBar>
      <Wrapper>
        <TopQuestions />
      </Wrapper>
    </Container>
  );
}
