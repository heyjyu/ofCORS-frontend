import { useEffect } from 'react';
import styled from 'styled-components';
import Navigator from '../components/Navigator';
import Questions from '../components/Questions';
import useQuestionStore from '../hooks/useQuestionStore';

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

export default function QuestionsPage() {
  const questionStore = useQuestionStore();

  useEffect(() => {
    questionStore.fetchQuestions({ sort: 'createdAt' });
  }, []);

  return (
    <Container>
      <LeftSideBar>
        <Navigator />
      </LeftSideBar>
      <Wrapper>
        <Questions />
      </Wrapper>
    </Container>
  );
}
