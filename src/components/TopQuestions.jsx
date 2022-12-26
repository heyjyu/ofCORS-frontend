import styled from 'styled-components';
import useTopQuestionStore from '../hooks/useTopQuestionStore';
import AskLink from './AskLink';
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

export default function TopQuestions() {
  const topQuestionStore = useTopQuestionStore();

  const handleClickWeek = () => {
    topQuestionStore.fetchQuestions({ period: 'week' });
  };

  const handleClickMonth = () => {
    topQuestionStore.fetchQuestions({ period: 'month' });
  };

  if (topQuestionStore.isQuestionsLoading) {
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
            인기 질문
          </Title>
          <AskLink />
        </Header>
        <Buttons>
          <button type="button" onClick={handleClickWeek}>
            week
          </button>
          <button type="button" onClick={handleClickMonth}>
            month
          </button>
        </Buttons>
      </Wrapper>
      {topQuestionStore.questions.length
        ? (
          topQuestionStore.questions
            .map((question) => (
              <QuestionItem key={question.id} question={question} />
            ))
        ) : (
          <p>질문을 등록해주세요!</p>
        )}
    </div>
  );
}
