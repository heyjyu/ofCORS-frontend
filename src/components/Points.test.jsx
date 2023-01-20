import {
  render, screen,
} from '@testing-library/react';
import Points from './Points';

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/prop-types
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
}));

describe('Points', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderPoints() {
    render((
      <Points />
    ));
  }

  it('renders points', async () => {
    renderPoints();

    screen.getAllByText(/pt/);
  });
});
