import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import AdoptForm from '../components/AdoptForm';
import useAnswerStore from '../hooks/useAnswerStore';
import useSelectAnswerFormStore from '../hooks/useSelectAnswerFormStore';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 50em;
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
        <p>
          잘못된 접근입니다.
        </p>
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
