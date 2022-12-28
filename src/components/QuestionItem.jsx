import styled from 'styled-components';
import Tags from './Tags';
import Point from './Point';

const Container = styled.div`
  display: flex;
  align-items: center;  
  gap: 1em;
  padding-block: 0.75em;
  border-bottom: 1px solid black;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
  width: 5em;
`;

export default function QuestionItem({ question }) {
  return (
    <Container>
      <Wrapper>
        <div>
          {question.likeUserIds.length}
          {' '}
          추천
        </div>
        <Point amount={question.points} />
        <div>
          {question.hits}
          {' '}
          조회
        </div>
      </Wrapper>
      <div>
        <h2>
          <a href={`/questions/${question.id}`}>
            {question.title}
          </a>
        </h2>
        <Tags tags={question.tags} />
      </div>
    </Container>
  );
}
