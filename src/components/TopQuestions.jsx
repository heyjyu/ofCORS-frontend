import styled from 'styled-components';
import useTopQuestionsStore from '../hooks/useTopQuestionsStore';
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

export default function TopQuestions() {
  const topQuestionsStore = useTopQuestionsStore();

  const handleClickWeek = () => {
    topQuestionsStore.fetchQuestions({ period: 'week' });
  };

  const handleClickMonth = () => {
    topQuestionsStore.fetchQuestions({ period: 'month' });
  };

  if (!topQuestionsStore.isQuestionsLoaded) {
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
            인기 질문
          </Title>
          <button type="button">
            질문하기
          </button>
        </div>
        <div>
          <button type="button" onClick={handleClickWeek}>
            week
          </button>
          <button type="button" onClick={handleClickMonth}>
            month
          </button>
        </div>
      </Wrapper>
      {topQuestionsStore.questions.length
        ? (
          topQuestionsStore.questions
            .map((question) => (
              <QuestionItem key={question.id} question={question} />
            ))
        ) : (
          <p>질문을 등록해주세요!</p>
        )}
    </div>
  );
}
