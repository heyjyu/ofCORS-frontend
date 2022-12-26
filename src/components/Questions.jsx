import styled from 'styled-components';
import useQuestionStore from '../hooks/useQuestionStore';
import AskLink from './AskLink';
import QuestionItem from './QuestionItem';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  border-bottom: 1px solid black;
`;

const Wrapper = styled.div`
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

  const handleSubmit = (e) => {
    e.preventDefault();
    questionStore.fetchQuestions({ sort: 'points', keyword: questionStore.keyword });
  };

  if (questionStore.isQuestionsLoading) {
    return (
      <p>
        Loading...
      </p>
    );
  }

  return (
    <div>
      <Header>
        <Wrapper>
          <Title>
            모든 질문
          </Title>
          <AskLink />
        </Wrapper>
        <Wrapper>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <input name="search" type="text" onChange={(e) => questionStore.changeKeyword(e.target.value)} />
          </form>
          <Buttons>
            <button type="button" onClick={handleClickLatest}>
              최신순
            </button>
            <button type="button" onClick={handleClickPoint}>
              포인트순
            </button>
          </Buttons>
        </Wrapper>
      </Header>
      {questionStore.questions.length
        ? (
          questionStore.questions
            .map((question) => (
              <QuestionItem key={question.id} question={question} />
            ))
        ) : (
          <p>질문이 아직 없습니다!</p>
        )}
    </div>
  );
}
