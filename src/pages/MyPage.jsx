import { useEffect } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import MyDetail from '../components/MyDetail';
import Navigator from '../components/Navigator';
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

export default function MyPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const userStore = useUserStore();
  const questionStore = useQuestionStore();
  const answerStore = useAnswerStore();

  const loadData = async () => {
    await userStore.fetchMe();
    questionStore.fetchQuestionPreviews({ userId: userStore.user.id });
    answerStore.fetchAnswerPreviews({ userId: userStore.user.id });
    questionStore.fetchScrappedQuestions();
    // TODO
    // questionStore.fetchQuestions({ userId: userStore.user.id, sort: 'createdAt' });
    // answerStore.fetchAnswers({userId: userStore.user.id });
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!accessToken || !userStore.user) {
    return (
      <Container>
        <p>
          잘못된 접근입니다.
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <LeftSideBar>
        <Navigator />
      </LeftSideBar>
      <Wrapper>
        <MyDetail />
      </Wrapper>
    </Container>
  );
}
