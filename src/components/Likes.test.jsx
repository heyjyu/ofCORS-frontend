import {
  render, screen,
} from '@testing-library/react';
import Likes from './Likes';

describe('Likes', () => {
  function renderLikes({ count }) {
    render((
      <Likes count={count} selected />
    ));
  }

  it('renders like count', async () => {
    renderLikes({ count: 2 });

    screen.getByText(/2/);
  });
});
