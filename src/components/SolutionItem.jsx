import styled from 'styled-components';
import Tags from './Tags';

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

export default function SolutionItem({ solution }) {
  return (
    <Container>
      <Wrapper>
        <div>
          {solution.likeUserIds.length}
          {' '}
          추천
        </div>
        <div>
          {solution.hits}
          {' '}
          조회
        </div>
      </Wrapper>
      <div>
        <h2>
          <a href={`/questions/${solution.id}`}>
            {solution.title}
          </a>
        </h2>
        <Tags tags={solution.tags} />
      </div>
    </Container>
  );
}
