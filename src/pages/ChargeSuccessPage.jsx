import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import usePointStore from '../hooks/usePointStore';
import PointPurchaseResult from '../components/PointPurchaseResult';

const Container = styled.main`
  width: 100%;
  height: calc(100vh - 3em);
  min-height: 50em;
`;

export default function ChargeSuccessPage() {
  const pointStore = usePointStore();

  const [searchParams] = useSearchParams();

  const pgToken = searchParams.get('pg_token');

  useEffect(() => {
    pointStore.fetchPaymentResult(pgToken);
  }, []);

  return (
    <Container>
      <PointPurchaseResult />
    </Container>
  );
}
