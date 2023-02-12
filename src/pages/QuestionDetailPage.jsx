import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Navigator from '../components/Navigator';
import QuestionDetail from '../components/QuestionDetail';
import useAnswerStore from '../hooks/useAnswerStore';

import useQuestionStore from '../hooks/useQuestionStore';
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

export default function QuestionDetailPage() {
  const { id } = useParams();

  const questionStore = useQuestionStore();
  const answerStore = useAnswerStore();
  const userStore = useUserStore();

  useEffect(() => {
    if (id) {
      questionStore.fetchQuestion(id);
      answerStore.fetchAnswers({ questionId: id });
    }
  }, [id]);

  useEffect(() => {
    userStore.fetchMe();
  }, []);

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
