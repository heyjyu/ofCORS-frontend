import { useNavigate } from 'react-router-dom';
import usePointStore from '../hooks/usePointStore';
import Header from './ui/Header';
import Title from './ui/Title';

export default function PointPurchaseResult() {
  const navigate = useNavigate();
  const pointStore = usePointStore();
  const { paymentResult } = pointStore;

  if (!paymentResult) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header>
        <Title>
          구매 결과
        </Title>
      </Header>
      <p>구매가 정상적으로 완료되었습니다</p>
      <p>구매일시</p>
      <p>{paymentResult.approved_at}</p>
      <p>주문번호</p>
      <p>{paymentResult.partner_order_id}</p>
      <p>구매포인트</p>
      <p>
        {paymentResult.quantity}
        pt
      </p>
      <p>결제금액</p>
      <p>
        {paymentResult.amount.total.toLocaleString()}
        원
      </p>
      <button type="button" onClick={() => navigate('/mypage')}>
        확인
      </button>
    </div>
  );
}
