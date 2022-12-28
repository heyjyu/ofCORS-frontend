import { render, screen } from '@testing-library/react';
import AskLink from './AskLink';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/prop-types
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate() {
    return navigate;
  },
}));

describe('AskLink', () => {
  function renderAskLink() {
    render((
      <AskLink />
    ));
  }

  it('renders link to asking question page', () => {
    renderAskLink();

    expect(screen.getByText('질문하기')).toHaveAttribute('href', '/ask');
  });
});
