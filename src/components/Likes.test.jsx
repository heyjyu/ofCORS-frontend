import {
  fireEvent,
  render, screen,
} from '@testing-library/react';
import Likes from './Likes';

const context = describe;

describe('Likes', () => {
  const handleClick = jest.fn();

  function renderLikes({ count }) {
    render((
      <Likes count={count} selected onClick={handleClick} />
    ));
  }

  it('renders like count', async () => {
    renderLikes({ count: 2 });

    screen.getByText(/2/);
  });

  context('when the button is clicked', () => {
    it('calls handleClick', () => {
      renderLikes({ count: 2 });

      fireEvent.click(screen.getByText('like'));

      expect(handleClick).toBeCalled();
    });
  });
});
