import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 2em;
`;

const Message = styled.p`
  font-weight: 700;
  margin-bottom: 1em;
  padding: 1.25em;
  border: 1px solid #EAEAEC;
  background: white;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  font-weight: 700;
  width: 10em;
  height: 3em;
  padding: 0.5em 3em;
  border: 1px solid #AB92FF;
  border-radius: 0.25em;
  background: #BAA5FF;
  color: white;
`;

export default function UserVerificationResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isSuccessful = searchParams.get('success') === 'true';

  const resultType = isSuccessful ? '성공' : '실패';
  return (
    <Container>
      <Message>{`실명인증에 ${resultType}하였습니다`}</Message>
      <ButtonWrapper>
        <Button type="button" onClick={() => navigate('/mypage')}>
          돌아가기
        </Button>
      </ButtonWrapper>
    </Container>
  );
}
