import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useProfileEditFormStore from '../hooks/useProfileEditFormStore';
import useUserStore from '../hooks/useUserStore';
import Input from './ui/Input';

const Container = styled.div`
  width: 30em;
`;

const Label = styled.label`
  display: block;
  cursor: pointer;
`;

const ImageInput = styled.input`
  display: none;
`;

export default function ProfileEditForm() {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const profileEditFormStore = useProfileEditFormStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await profileEditFormStore.validate();

    if (profileEditFormStore.isValidateSuccessful) {
      await userStore.editProfile({
        displayName: profileEditFormStore.fields.displayName,
        about: profileEditFormStore.fields.about,
        imageUrl: profileEditFormStore.fields.imageUrl,
        tags: profileEditFormStore.tags,
      });

      navigate('/mypage');
    }
  };

  const handleClickCancel = () => {
    profileEditFormStore.reset();
    navigate('/mypage');
  };

  const handleClickTag = () => {
    profileEditFormStore.addTag(profileEditFormStore.fields.tag);
    profileEditFormStore.changeTag('');
  };

  useEffect(() => {
    if (userStore.isSignUpSuccessful) {
      navigate('/login', { state: { previousPage: 'signUpPage' } });
    }
  }, [userStore.isSignUpSuccessful]);

  return (
    <Container>
      <h1>프로필 수정</h1>
      <form onSubmit={handleSubmit}>
        <img alt="avatar" src={profileEditFormStore.fields.imageUrl} width={50} height={50} />
        <Label htmlFor="input-image">
          이미지 수정
        </Label>
        <ImageInput
          id="input-image"
          type="file"
          accept="image/*"
          onChange={(e) => profileEditFormStore.changeImage(e.target.files[0])}
        />
        <Input
          name="display-name"
          label="닉네임"
          type="text"
          value={profileEditFormStore.fields.displayName || ''}
          onChange={(e) => profileEditFormStore.changeDisplayName(e.target.value)}
          message="3자 이상 입력해주세요"
          errorMessage={profileEditFormStore.errors.displayName}
        />
        <Input
          name="about"
          label="한 줄 소개"
          type="text"
          value={profileEditFormStore.fields.about || ''}
          onChange={(e) => profileEditFormStore.changeAbout(e.target.value)}
        />
        <Input
          name="tag"
          label="태그"
          type="text"
          value={profileEditFormStore.fields.tag || ''}
          onChange={(e) => profileEditFormStore.changeTag(e.target.value)}
          errorMessage={profileEditFormStore.errors.tag}
        />
        <button type="button" onClick={handleClickTag}>
          추가
        </button>
        {profileEditFormStore.tags ? [...profileEditFormStore.tags].map((tag) => (
          <div key={tag}>
            {tag}
            <button type="button" onClick={() => profileEditFormStore.removeTag(tag)}>
              x
            </button>
          </div>
        )) : null}
        <div>
          <button type="submit">
            저장
          </button>
          <button type="button" onClick={handleClickCancel}>
            취소
          </button>
        </div>
      </form>
    </Container>
  );
}
