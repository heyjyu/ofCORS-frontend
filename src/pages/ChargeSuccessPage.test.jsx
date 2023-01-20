import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { pointStore } from '../stores/PointStore';
import ChargeSuccessPage from './ChargeSuccessPage';

describe('ChargeSuccessPage', () => {
  it('renders message', async () => {
    await pointStore.fetchPaymentResult('pg_token');

    await act(() => {
      render((
        <MemoryRouter initialEntries={['/charge/success']}>
          <ChargeSuccessPage />
        </MemoryRouter>
      ));
    });

    await waitFor(() => {
      screen.getByText('구매가 정상적으로 완료되었습니다');
    });
  });
});
