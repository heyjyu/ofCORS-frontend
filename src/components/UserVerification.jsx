import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import Input from './ui/Input';
import useVerifyUserFormStore from '../hooks/useUserVerifyFormStore';
import useUserStore from '../hooks/useUserStore';
import Title from './ui/Title';
import Header from './ui/Header';

export default function UserVerification() {
  const verifyUserFormStore = useVerifyUserFormStore();
  const userStore = useUserStore();
  const navigate = useNavigate();

  const callback = (response) => {
    const query = queryString.stringify(response);

    userStore.completeVerify(verifyUserFormStore.fields.name);

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
        <Title>
          실명 인증하기
        </Title>
      </Header>
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          label="이름"
          type="text"
          value={verifyUserFormStore.fields.name || ''}
          onChange={(e) => verifyUserFormStore.changeName(e.target.value)}
          errorMessage={verifyUserFormStore.errors.name}
        />
        <Input
          name="phoneNumber"
          label="전화번호"
          type="number"
          value={verifyUserFormStore.fields.phoneNumber || ''}
          onChange={(e) => verifyUserFormStore.changePhoneNumber(e.target.value)}
          errorMessage={verifyUserFormStore.errors.phoneNumber}
        />
        <button type="submit">
          본인인증하기
        </button>
      </form>
    </div>
  );
}
