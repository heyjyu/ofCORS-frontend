import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Message = styled.p`
  display: block;
  font-weight: 700;
  padding: 1.25em;
  margin-top: 1em;
  border: 1px solid #EAEAEC;
  background: white;
`;

export default function ChargeCancelPage() {
  return (
    <Container>
      <Message>결제를 취소하셨습니다.</Message>
    </Container>
  );
}
