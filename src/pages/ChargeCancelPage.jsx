import styled from 'styled-components';

const Container = styled.main`
  width: 100%;
  height: calc(100vh - 3em);
  min-height: 50em;
`;

export default function ChargeCancelPage() {
  return (
    <Container>
      <p>결제를 취소하셨습니다.</p>
    </Container>
  );
}
