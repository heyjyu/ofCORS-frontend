import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Navigator from '../components/Navigator';
import QuestionDetail from '../components/QuestionDetail';

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

export default function QuestionDetailPage() {
  const { id } = useParams();

  const questionStore = useQuestionStore();

  useEffect(() => {
    if (id) {
      questionStore.fetchQuestion(id);
    }
  }, [id]);

  return (
    <Container>
      <LeftSideBar>
        <Navigator />
      </LeftSideBar>
      <Wrapper>
        <QuestionDetail />
      </Wrapper>
    </Container>
  );
}
