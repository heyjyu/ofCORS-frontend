import styled from 'styled-components';

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

const Point = styled.div`
  height: 1.5em;
  padding: 0.4em 0.5em;
  border-radius: 0.25em;
  background-color: #70C28B;
  color: white;
  line-height: 1em;
`;

const Tag = styled.div`
  display: inline-block;
  height: 1.5em;
  padding: 0.4em 0.5em;
  border-radius: 0.25em;
  background-color: skyblue;
  color: white;
  line-height: 1em;
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
        <ul>
          {solution.tags.map((tag) => (
            <li key={tag}>
              <Tag>
                {tag.name}
              </Tag>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
