import { useEffect } from 'react';
import styled from 'styled-components';
import Navigator from '../components/Navigator';
import TopQuestions from '../components/TopQuestions';
import useTopQuestionsStore from '../hooks/useTopQuestionsStore';

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

const LeftSideBar = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  flex: 1;
`;

export default function HomePage() {
  const topQuestionsStore = useTopQuestionsStore();

  useEffect(() => {
    topQuestionsStore.fetchQuestions();
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
