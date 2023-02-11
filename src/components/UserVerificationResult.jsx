import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const Message = styled.p`
  font-weight: 700;
  padding: 1.25em;
  border: 1px solid #EAEAEC;
  background: white;
`;

export default function UserVerificationResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isSuccessful = searchParams.get('success') === 'true';

  const resultType = isSuccessful ? '성공' : '실패';
  return (
    <div>
      <Message>{`실명인증에 ${resultType}하였습니다`}</Message>
      <button type="button" onClick={() => navigate('/mypage')}>
        돌아가기
      </button>
    </div>
  );
}
