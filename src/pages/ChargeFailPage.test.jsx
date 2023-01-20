import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ChargeFailPage from './ChargeFailPage';

describe('ChargeFailPage', () => {
  it('renders message', () => {
    render((
      <MemoryRouter initialEntries={['/charge/fail']}>
        <ChargeFailPage />
      </MemoryRouter>
    ));

    screen.getByText('결제가 실패했습니다');
  });
});
