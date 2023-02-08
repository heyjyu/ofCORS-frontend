import styled from 'styled-components';
import UserVerification from '../components/UserVerification';

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

const Wrapper = styled.div`
  flex: 1;
`;

export default function VerifyUserPage() {
  return (
    <Container>
      <Wrapper>
        <UserVerification />
      </Wrapper>
    </Container>
  );
}
