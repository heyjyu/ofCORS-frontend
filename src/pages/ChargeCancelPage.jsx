import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 50em;
`;

export default function ChargeCancelPage() {
  return (
    <Container>
      <p>결제를 취소하셨습니다.</p>
    </Container>
  );
}
