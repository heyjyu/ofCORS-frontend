import styled from 'styled-components';
import UserVerificationResult from '../components/UserVerificationResult';

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

const Wrapper = styled.div`
  flex: 1;
`;

export default function VerifyUserResultPage() {
  return (
    <Container>
      <Wrapper>
        <UserVerificationResult />
      </Wrapper>
    </Container>
  );
}
