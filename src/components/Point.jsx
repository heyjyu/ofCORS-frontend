import styled from 'styled-components';

const Container = styled.div`
  width: fit-content;
  height: 1.5em;
  padding: 0.4em 0.5em;
  border-radius: 0.25em;
  background-color: #70C28B;
  color: white;
  line-height: 1em;
`;

export default function Point({ amount }) {
  return (
    <Container>
      {amount}
      pt
    </Container>
  );
}
