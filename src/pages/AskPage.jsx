import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import QuestionForm from '../components/QuestionForm';
import useQuestionFormStore from '../hooks/useQuestionFormStore';
import useQuestionStore from '../hooks/useQuestionStore';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 50em;
`;

export default function AskPage() {
  const navigate = useNavigate();
  const [accessToken] = useLocalStorage('accessToken', '');

  const questionStore = useQuestionStore();
  const questionFormStore = useQuestionFormStore();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, []);

  useEffect(() => () => {
    questionFormStore.reset();
    questionStore.reset();
  }, []);

  return (
    <Container>
      <QuestionForm />
    </Container>
  );
}
