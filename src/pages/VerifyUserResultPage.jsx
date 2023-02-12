import styled from 'styled-components';
import UserVerificationResult from '../components/UserVerificationResult';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default function VerifyUserResultPage() {
  return (
    <Container>
      <UserVerificationResult />
    </Container>
  );
}
