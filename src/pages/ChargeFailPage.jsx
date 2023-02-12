import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Message = styled.p`
  display: block;
  font-weight: 700;
  margin-top: 1em;
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
