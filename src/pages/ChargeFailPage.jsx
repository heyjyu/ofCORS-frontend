import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 50em;
`;

export default function ChargeFailPage() {
  return (
    <Container>
      <p>결제가 실패했습니다</p>
    </Container>
  );
}
