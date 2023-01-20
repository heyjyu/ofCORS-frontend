import styled from 'styled-components';

const Container = styled.main`
  width: 100%;
  height: calc(100vh - 3em);
  min-height: 50em;
`;

export default function ChargeFailPage() {
  return (
    <Container>
      <p>결제가 실패했습니다</p>
    </Container>
  );
}
