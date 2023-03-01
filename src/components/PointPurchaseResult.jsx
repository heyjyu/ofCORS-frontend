import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import usePointStore from '../hooks/usePointStore';
import Header from './ui/Header';
import Title from './ui/Title';

const Container = styled.div`
  background: white;
  padding: 2em 1em;
  border: 1px solid #EAEAEC;

  h2 {
    font-size: 1.2em;
    font-weight: 700;
    margin-bottom: 2em;
  }
`;

const Wrapper = styled.div`
  display: flex;
  margin-block: 1em;

  p:first-child {
    font-weight: 700;
    width: 10em;
  }
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

export default function PointPurchaseResult() {
  const navigate = useNavigate();
  const pointStore = usePointStore();
  const { paymentResult } = pointStore;

  if (!paymentResult) {
    return <p />;
  }

  return (
    <div>
      <Header>
        <Title>
          구매 결과
        </Title>
      </Header>
      <Container>
        <h2>구매가 정상적으로 완료되었습니다</h2>
        <Wrapper>
          <p>구매일시</p>
          <p>{paymentResult.approved_at}</p>
        </Wrapper>
        <Wrapper>
          <p>주문번호</p>
          <p>{paymentResult.partner_order_id}</p>
        </Wrapper>
        <Wrapper>
          <p>구매포인트</p>
          <p>
            {paymentResult.quantity}
            pt
          </p>
        </Wrapper>
        <Wrapper>
          <p>결제금액</p>
          <p>
            {paymentResult.amount.total.toLocaleString()}
            원
          </p>
        </Wrapper>
        <ButtonWrapper>
          <Button type="button" onClick={() => navigate('/mypage')}>
            확인
          </Button>
        </ButtonWrapper>
      </Container>
    </div>
  );
}
