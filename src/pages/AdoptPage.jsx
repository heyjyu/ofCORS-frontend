import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import AdoptForm from '../components/AdoptForm';
import useAnswerStore from '../hooks/useAnswerStore';
import useSelectAnswerFormStore from '../hooks/useSelectAnswerFormStore';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Message = styled.p`
  font-weight: 700;
  padding: 1.25em;
  border: 1px solid #EAEAEC;
  background: white;
`;

export default function AdoptPage() {
  const { id } = useParams();
  const [accessToken] = useLocalStorage('accessToken', '');

  const selectAnswerFormStore = useSelectAnswerFormStore();
  const answerStore = useAnswerStore();

  useEffect(() => {
    if (selectAnswerFormStore.selectedAnswerId) {
      answerStore.fetchAnswer(selectAnswerFormStore.selectedAnswerId);
    }
  }, []);

  useEffect(() => {
    selectAnswerFormStore.reset();
  }, []);

  if (!accessToken
    || !selectAnswerFormStore.selectedAnswerId
    || (answerStore.answer && answerStore.answer?.questionId !== Number(id))) {
    return (
      <Container>
        <Message>
          잘못된 접근입니다.
        </Message>
      </Container>
    );
  }

  if (!answerStore.answer) {
    return null;
  }

  return (
    <Container>
      <AdoptForm />
    </Container>
  );
}
