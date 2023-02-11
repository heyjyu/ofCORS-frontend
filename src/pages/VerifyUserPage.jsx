import { useEffect } from 'react';
import styled from 'styled-components';
import UserVerification from '../components/UserVerification';
import useVerifyUserFormStore from '../hooks/useUserVerifyFormStore';

const Container = styled.div`
  display: flex;
  position: relative;
  width: 30%;
`;

const Wrapper = styled.div`
  flex: 1;
`;

export default function VerifyUserPage() {
  const verifyUserFormStore = useVerifyUserFormStore();

  useEffect(() => () => {
    verifyUserFormStore.reset();
  }, []);

  return (
    <Container>
      <Wrapper>
        <UserVerification />
      </Wrapper>
    </Container>
  );
}
