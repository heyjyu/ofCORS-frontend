import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ChargePage from './ChargePage';

describe('ChargePage', () => {
  it('renders message', () => {
    render((
      <MemoryRouter initialEntries={['/charge']}>
        <ChargePage />
      </MemoryRouter>
    ));

    screen.getByText('포인트 구매');
  });
});
