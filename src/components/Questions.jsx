import styled from 'styled-components';
import useQuestionStore from '../hooks/useQuestionStore';
import QuestionItem from './QuestionItem';

const Title = styled.h1`
  font-size: 1.5em;
  margin: 1em;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  border-bottom: 1px solid black;
`;

export default function Questions() {
  const questionStore = useQuestionStore();

  const handleClickLatest = () => {
    // TODO sort
  };

  const handleClickPoint = () => {
    // TODO sort
  };

  if (!questionStore.isQuestionsLoaded) {
    return (
      <p>
        Loading...
      </p>
    );
  }

  return (
    <div>
      <Wrapper>
        <div>
          <Title>
            모든 질문
          </Title>
          <button type="button">
            질문하기
          </button>
        </div>
        <div>
          <button type="button" onClick={handleClickLatest}>
            최신순
          </button>
          <button type="button" onClick={handleClickPoint}>
            포인트순
          </button>
        </div>
      </Wrapper>
      {questionStore.questions.length
        ? (
          questionStore.questions
            .map((question) => (
              <QuestionItem key={question.id} question={question} />
            ))
        ) : (
          <p>질문을 등록해주세요!</p>
        )}
    </div>
  );
}
