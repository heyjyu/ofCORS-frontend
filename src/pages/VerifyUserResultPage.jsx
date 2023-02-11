import styled from 'styled-components';
import UserVerificationResult from '../components/UserVerificationResult';

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  min-height: 50em;
`;

export default function VerifyUserResultPage() {
  return (
    <Container>
      <UserVerificationResult />
    </Container>
  );
}
