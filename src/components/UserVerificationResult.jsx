import { useNavigate, useSearchParams } from 'react-router-dom';

export default function UserVerificationResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isSuccessful = searchParams.get('success') === 'true';

  const resultType = isSuccessful ? '성공' : '실패';
  return (
    <div>
      <p>{`실명인증에 ${resultType}하였습니다`}</p>
      <button type="button" onClick={() => navigate('/mypage')}>
        돌아가기
      </button>
    </div>
  );
}
