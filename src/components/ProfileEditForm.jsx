import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useProfileEditFormStore from '../hooks/useProfileEditFormStore';
import useUserStore from '../hooks/useUserStore';
import Header from './ui/Header';
import Title from './ui/Title';

const Wrapper = styled.div`
  margin-block: 1em;
  padding: 2em 1.5em;
  border: 1px solid #EAEAEC;
  background-color: white;

  span {
    font-weight: 700;
    display: flex;
    align-items: center;
    width: 5em;
  }

  div {
    display: flex;

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.25em;
      margin-left: 1em;

      p {
        color: #8E8E8E;
      }
    }
  }

  input {
    width: 17em;
    margin-right: 0.5em;
    padding: 0.5em 0.75em;
    border: 1px solid #EAEAEC;

    :focus {
      border: 1px solid #6C40FF;
      outline: none;
    }

    ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    }
  }

  button {
    padding-inline: 1em;
    border: none;
    background: #777677;
    color: white;
  }
`;

const Label = styled.label`
  font-weight: 700;
  display: flex;
  align-items: center;
  width: 5em;
`;

const ImageLabel = styled.label`
  display: flex;
  align-items: center;
  font-weight: 400;
  width: fit-content;
  padding: 0.5em 1em;
  background: #777677;
  color: white;
  cursor: pointer;
`;

const ImageInput = styled.input`
  display: none;
`;

const Image = styled.img`
  border-radius: 50%;
`;

const List = styled.ul`
  display: flex;
  gap: 0.5em;
  padding: 0.5em 0 0 5em;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  height: 2em;
  padding: 0.75em;
  border: 1px solid #E2D9FF;
  border-radius: 1em;
  background: #EBE4FF;

  div {
    padding-top: 0.25em;
    color: #6C40FF;
  }

  button {
    padding: 0 0 0 1em;
    border: none;
    background: transparent;
  }
`;

const Error = styled.p`
  font-size: 0.9em;
  padding-top: 1em;
  color: #FF424D;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1em;
`;

const CancelButton = styled.button`
  font-size: 1em;
  padding: 1em 2em;
  border: 1px solid #D9D9D9;
  border-radius: 0.25em;
  background: #FFFFFF;
  color: #808080;
`;

const SaveButton = styled.button`
  font-size: 1em;
  padding: 1em 2em;
  border: 1px solid #AB92FF;
  border-radius: 0.25em;
  background: #BAA5FF;
  color: white;
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
    <div>
      <Header>
        <Title>프로필 수정</Title>
      </Header>
      <form onSubmit={handleSubmit}>
        <Wrapper>
          <div>
            <span>이미지</span>
            <Image alt="avatar" src={profileEditFormStore.fields.imageUrl} width={75} height={75} />
            <ImageInput
              id="input-image"
              type="file"
              accept="image/*"
              onChange={(e) => profileEditFormStore.changeImage(e.target.files[0])}
            />
            <div>
              <p>추천 사이즈: 240 X 240</p>
              <p>JPG, PNG, GIF. 최대 2MB</p>
              <ImageLabel htmlFor="input-image">
                이미지 업로드
              </ImageLabel>
            </div>
          </div>
        </Wrapper>
        <Wrapper>
          <div>
            <Label htmlFor="input-display-name">
              닉네임
            </Label>
            <input
              name="display-name"
              id="input-display-name"
              type="text"
              value={profileEditFormStore.fields.displayName || ''}
              onChange={(e) => profileEditFormStore.changeDisplayName(e.target.value)}
              placeholder="3자 이상 입력해주세요"
            />
          </div>
          {profileEditFormStore.errors.displayName
            ? <Error>{profileEditFormStore.errors.displayName}</Error>
            : null}
        </Wrapper>
        <Wrapper>
          <div>
            <Label htmlFor="input-about">
              한 줄 소개
            </Label>
            <input
              name="about"
              id="input-about"
              type="text"
              value={profileEditFormStore.fields.about || ''}
              onChange={(e) => profileEditFormStore.changeAbout(e.target.value)}
            />
          </div>
        </Wrapper>
        <Wrapper>
          <div>
            <Label htmlFor="input-tag">
              태그
            </Label>
            <input
              name="tag"
              id="input-tag"
              type="text"
              value={profileEditFormStore.fields.tag || ''}
              onChange={(e) => profileEditFormStore.changeTag(e.target.value)}
            />
            <button type="button" onClick={handleClickTag}>
              추가
            </button>
          </div>
          <List>
            {profileEditFormStore.tags ? [...profileEditFormStore.tags].map((tag) => (
              <Item key={tag}>
                <div>
                  {tag}
                </div>
                <button type="button" onClick={() => profileEditFormStore.removeTag(tag)}>
                  X
                </button>
              </Item>
            )) : null}
          </List>
        </Wrapper>
        <ButtonWrapper>
          <CancelButton type="button" onClick={handleClickCancel}>
            취소
          </CancelButton>
          <SaveButton type="submit">
            저장
          </SaveButton>
        </ButtonWrapper>
      </form>
    </div>
  );
}
