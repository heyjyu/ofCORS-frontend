import styled from 'styled-components';
import useTopQuestionStore from '../hooks/useTopQuestionStore';
import AskLink from './AskLink';
import QuestionItem from './QuestionItem';
import Header from './ui/Header';
import Title from './ui/Title';

const Wrapper = styled.div`
  display: flex;
  gap: 1em;
`;

const Select = styled.select`
  padding: 0.5em 2.5em 0.5em 0.75em;
  border: 1px solid #EAEAEC;
  border-radius: 0.5em;
  background: url(/assets/images/triangle.svg) no-repeat center right 0.75em;
  background-color: white;
  color: #838383;
  -moz-appearance:none; /* Firefox */
  -webkit-appearance:none; /* Safari and Chrome */
  appearance:none;

  :focus {
    outline: none;
  }
`;

const Message = styled.p`
  font-weight: 700;
  padding: 1.25em;
  border: 1px solid #EAEAEC;
  background: white;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 1.25em;
  border: 1px solid #EAEAEC;
  background: white;
`;

export default function TopQuestions() {
  const topQuestionStore = useTopQuestionStore();

  if (topQuestionStore.isQuestionsLoading) {
    return (
      <p>
        Loading...
      </p>
    );
  }

  return (
    <div>
      <Header>
        <Title>
          인기 질문
        </Title>
        <Wrapper>
          <Select
            name="sort"
            value={topQuestionStore.period}
            onChange={(e) => topQuestionStore.fetchQuestions({ period: e.target.value })}
          >
            <option value="week">
              week
            </option>
            <option value="month">
              month
            </option>
          </Select>
          <AskLink />
        </Wrapper>
      </Header>
      {topQuestionStore.questions.length
        ? (
          <List>
            {topQuestionStore.questions
              .map((question) => (
                <QuestionItem key={question.id} question={question} />
              ))}
          </List>
        ) : (
          <Message>질문을 등록해주세요!</Message>
        )}
    </div>
  );
}
