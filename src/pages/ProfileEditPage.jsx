import { useEffect } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useUserStore from '../hooks/useUserStore';
import ProfileEditForm from '../components/ProfileEditForm';
import useProfileEditFormStore from '../hooks/useProfileEditFormStore';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-height: 50em;
`;

const Message = styled.p`
  font-weight: 700;
  padding: 1.25em;
  border: 1px solid #EAEAEC;
  background: white;
`;

export default function ProfileEditPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const userStore = useUserStore();
  const profileEditFormStore = useProfileEditFormStore();

  const loadData = async () => {
    await userStore.fetchMe();
    profileEditFormStore.reset();
    profileEditFormStore.fillFields(userStore.user);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (!accessToken) {
    return (
      <Container>
        <Message>
          잘못된 접근입니다.
        </Message>
      </Container>
    );
  }

  return (
    <Container>
      <ProfileEditForm />
    </Container>
  );
}
