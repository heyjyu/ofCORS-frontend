import {
  render, screen,
} from '@testing-library/react';
import Point from './Point';

describe('Point', () => {
  function renderPoint({ amount }) {
    render((
      <Point amount={amount} />
    ));
  }

  it('renders amount', async () => {
    renderPoint({ amount: 2 });

    screen.getByText(/2/);
  });
});
