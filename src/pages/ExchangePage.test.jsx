import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ExchangePage from './ExchangePage';

describe('ExchangePage', () => {
  it('renders message', async () => {
    render((
      <MemoryRouter initialEntries={['/exchange']}>
        <ExchangePage />
      </MemoryRouter>
    ));

    await waitFor(() => {
      screen.getByText('포인트 환전 신청 전 꼭 읽어주세요!');
    });
  });
});
