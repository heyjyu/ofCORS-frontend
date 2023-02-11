import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 50em;
`;

const Message = styled.p`
  font-weight: 700;
  padding: 1.25em;
  border: 1px solid #EAEAEC;
  background: white;
`;

export default function ChargeFailPage() {
  return (
    <Container>
      <Message>결제가 실패했습니다</Message>
    </Container>
  );
}
