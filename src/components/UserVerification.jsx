import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import Input from './ui/Input';
import useVerifyUserFormStore from '../hooks/useUserVerifyFormStore';
import useUserStore from '../hooks/useUserStore';
import Title from './ui/Title';
import Header from './ui/Header';

const StyledTitle = styled(Title)`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Button = styled.button`
  font-weight: 700;
  width: 100%;
  height: 3em;
  padding: 0.5em 3em;
  border: 1px solid #AB92FF;
  border-radius: 0.25em;
  background: #BAA5FF;
  color: white;
`;

export default function UserVerification() {
  const verifyUserFormStore = useVerifyUserFormStore();
  const userStore = useUserStore();
  const navigate = useNavigate();

  const callback = (response) => {
    const query = queryString.stringify(response);

    if (response.success) {
      userStore.completeVerify(verifyUserFormStore.fields.name);
    }

    navigate(`/verify-user/result?${query}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    verifyUserFormStore.validate();

    if (verifyUserFormStore.isValidateSuccessful) {
      const userCode = 'imp10391932';

      const data = {
        popup: true,
      };

      data.name = verifyUserFormStore.fields.name;
      data.phone = verifyUserFormStore.fields.phoneNumber;

      const { IMP } = window;
      IMP.init(userCode);
      IMP.certification(data, callback);
    }
  };

  return (
    <div>
      <Header>
        <StyledTitle>
          실명 인증하기
        </StyledTitle>
      </Header>
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          placeholder="이름 입력"
          type="text"
          value={verifyUserFormStore.fields.name || ''}
          onChange={(e) => verifyUserFormStore.changeName(e.target.value)}
          errorMessage={verifyUserFormStore.errors.name}
        />
        <Input
          name="phoneNumber"
          placeholder="전화번호 입력 (숫자로만 입력하세요)"
          type="number"
          value={verifyUserFormStore.fields.phoneNumber || ''}
          onChange={(e) => verifyUserFormStore.changePhoneNumber(e.target.value)}
          errorMessage={verifyUserFormStore.errors.phoneNumber}
        />
        <Button type="submit">
          본인인증하기
        </Button>
      </form>
    </div>
  );
}
