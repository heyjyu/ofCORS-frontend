import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import QuestionEditForm from '../components/QuestionEditForm';
import useQuestionStore from '../hooks/useQuestionStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 50em;
`;

export default function QuestionEditPage() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const questionStore = useQuestionStore();
  const userStore = useUserStore();

  const { id } = useParams();

  useEffect(() => {
    questionStore.fetchQuestion(id);
    userStore.fetchMe();
  }, []);

  if (!accessToken
    || (!questionStore.isQuestionLoading && !questionStore.isMyQuestion(userStore.user?.id))) {
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
      <QuestionEditForm />
    </Container>
  );
}
