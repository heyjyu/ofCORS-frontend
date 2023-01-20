import {
  render, screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { pointStore } from '../stores/PointStore';
import PointPurchaseResult from './PointPurchaseResult';

describe('PointPurchaseResult', () => {
  function renderPointPurchaseResult() {
    render((
      <MemoryRouter initialEntries={['/charge/success']}>
        <PointPurchaseResult />
      </MemoryRouter>
    ));
  }

  it('renders message', async () => {
    await pointStore.fetchPaymentResult('pg_token');

    renderPointPurchaseResult();

    screen.getByText('구매가 정상적으로 완료되었습니다');
  });
});
