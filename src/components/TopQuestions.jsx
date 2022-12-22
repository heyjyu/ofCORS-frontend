import styled from 'styled-components';
import useTopQuestionsStore from '../hooks/useTopQuestionsStore';
import QuestionItem from './QuestionItem';

const Title = styled.h1`
  font-size: 1.5em;
  margin: 1em;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;  
  gap: 1em;
  border-bottom: 1px solid black;
`;

export default function TopQuestions() {
  const topQuestionsStore = useTopQuestionsStore();

  if (!topQuestionsStore.fields.isQuestionsLoaded) {
    return (
      <p>
        Loading...
      </p>
    );
  }

  return (
    <div>
      <Wrapper>
        <Title>
          인기 질문
        </Title>
        <button type="button">
          질문하기
        </button>
      </Wrapper>
      {topQuestionsStore.fields.questions.length
        ? (
          topQuestionsStore.fields.questions
            .map((question) => (
              <QuestionItem key={question.id} question={question} />
            ))
        ) : (
          <p>질문을 등록해주세요!</p>
        )}
    </div>
  );
}
