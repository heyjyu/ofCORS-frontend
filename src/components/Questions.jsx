import styled from 'styled-components';
import useQuestionStore from '../hooks/useQuestionStore';
import QuestionItem from './QuestionItem';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  border-bottom: 1px solid black;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-inline: 1em;
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin: 1em;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1em;
  margin: 0 1em 1em;
`;

export default function Questions() {
  const questionStore = useQuestionStore();

  const handleClickLatest = () => {
    questionStore.fetchQuestions({ sort: 'createdAt' });
  };

  const handleClickPoint = () => {
    questionStore.fetchQuestions({ sort: 'points' });
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
        <Header>
          <Title>
            모든 질문
          </Title>
          <button type="button">
            질문하기
          </button>
        </Header>
        <Buttons>
          <button type="button" onClick={handleClickLatest}>
            최신순
          </button>
          <button type="button" onClick={handleClickPoint}>
            포인트순
          </button>
        </Buttons>
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
