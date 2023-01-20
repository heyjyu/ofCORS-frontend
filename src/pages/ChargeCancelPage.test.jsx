import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ChargeCancelPage from './ChargeCancelPage';

describe('ChargeCancelPage', () => {
  it('renders message', () => {
    render((
      <MemoryRouter initialEntries={['/charge/cancel']}>
        <ChargeCancelPage />
      </MemoryRouter>
    ));

    screen.getByText('결제를 취소하셨습니다.');
  });
});
