import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navigator from '../components/Navigator';
import UserDetail from '../components/UserDetail';
import useAnswerStore from '../hooks/useAnswerStore';
import useQuestionStore from '../hooks/useQuestionStore';
import useUserStore from '../hooks/useUserStore';

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

export default function UserDetailPage() {
  const { id } = useParams();

  const userStore = useUserStore();
  const questionStore = useQuestionStore();
  const answerStore = useAnswerStore();

  useEffect(() => {
    if (id) {
      userStore.fetchUser(id);
      questionStore.fetchQuestionPreviews({ userId: id });
      answerStore.fetchAnswerPreviews({ userId: id });
    }
  }, [id]);

  return (
    <Container>
      <LeftSideBar>
        <Navigator />
      </LeftSideBar>
      <Wrapper>
        <UserDetail />
      </Wrapper>
    </Container>
  );
}
