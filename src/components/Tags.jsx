import styled from 'styled-components';

const Container = styled.ul`
  display: flex;
  gap: 0.5em;
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

export default function Tags({ tags }) {
  return (
    <Container>
      {tags.map((tag) => (
        <li key={tag}>
          <Tag>
            {tag.name}
          </Tag>
        </li>
      ))}
    </Container>
  );
}
