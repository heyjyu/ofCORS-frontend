import {
  render, screen,
} from '@testing-library/react';
import Tags from './Tags';

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

describe('Tags', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderTags({ tags }) {
    render((
      <Tags tags={tags} />
    ));
  }

  it('renders tags', async () => {
    const tags = [{ name: 'Web' }];

    renderTags({ tags });

    screen.getByText('Web');
  });
});
