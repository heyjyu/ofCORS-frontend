import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Tags from './Tags';
import Point from './Point';

const Container = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding-block: 0.75em;

  h2 {
    font-weight: 700;
  }

  div {
    display: flex;
    align-items: center;
    gap: 0.75em;
  }
`;

const Wrapper = styled.div`
  font-weight: 400;
  display: flex;
  gap: 0.5em;
  color: #8E8E8E;

  div:first-child::after {
    content: "|";
    color: #EAEAEC;
  }
`;

export default function QuestionItem({ question }) {
  return (
    <Container>
      <div>
        <Point amount={question.points} />
        <h2>
          <Link to={`/questions/${question.id}`}>
            {question.title}
          </Link>
        </h2>
      </div>
      <div>
        <Wrapper>
          <div>
            추천수
            {' '}
            {question.likeUserIds.length}
          </div>
          <div>
            조회수
            {' '}
            {question.hits}
          </div>
        </Wrapper>
        <Tags tags={question.tags} />
      </div>
    </Container>
  );
}
