import styled from 'styled-components';
import useQuestionStore from '../hooks/useQuestionStore';
import AskLink from './AskLink';
import QuestionItem from './QuestionItem';
import Header from './ui/Header';
import Title from './ui/Title';

const StyledHeader = styled(Header)`
  flex-direction: column;
  align-items: flex-start;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-right: 1em;

  div {
    display: flex;
    gap: 1em;
  }
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

const Input = styled.input`
  width: 17em;
  margin-top: 2em;
  padding: 0.5em 0.75em;
  border: 1px solid #EAEAEC;

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

export default function Questions() {
  const questionStore = useQuestionStore();

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
      <StyledHeader>
        <Wrapper>
          <Title>
            모든 질문
          </Title>
          <div>
            <Select
              name="sort"
              value={questionStore.sort}
              onChange={(e) => questionStore.fetchQuestions({ sort: e.target.value })}
            >
              <option value="createdAt">
                최신순
              </option>
              <option value="points">
                포인트순
              </option>
            </Select>
            <AskLink />
          </div>
        </Wrapper>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Input name="search" type="text" placeholder="검색" onChange={(e) => questionStore.changeKeyword(e.target.value)} />
        </form>
      </StyledHeader>
      {questionStore.questions.length
        ? (
          <List>
            {questionStore.questions
              .map((question) => (
                <QuestionItem key={question.id} question={question} />
              ))}
          </List>
        ) : (
          <Message>질문이 아직 없습니다!</Message>
        )}
    </div>
  );
}
