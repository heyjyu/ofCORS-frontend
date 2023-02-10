import styled from 'styled-components';

const Container = styled.div`
  width: fit-content;
  height: 1.5em;
  padding: 0.4em 0.6em 0.3em;
  border-radius: 0.25em;
  background-color: #FFE792;
  color: black;
  line-height: 1em;
`;

export default function Point({ amount }) {
  return (
    <Container>
      {amount}
      P
    </Container>
  );
}
