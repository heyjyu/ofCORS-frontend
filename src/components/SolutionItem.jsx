import styled from 'styled-components';
import Tags from './Tags';

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

export default function SolutionItem({ solution }) {
  return (
    <Container>
      <h2>
        <a href={`/questions/${solution.id}`}>
          {solution.title}
        </a>
      </h2>
      <div>
        <Wrapper>
          <div>
            추천수
            {' '}
            {solution.likeUserIds.length}
          </div>
          <div>
            조회수
            {' '}
            {solution.hits}
          </div>
        </Wrapper>
        <Tags tags={solution.tags} />
      </div>
    </Container>
  );
}
