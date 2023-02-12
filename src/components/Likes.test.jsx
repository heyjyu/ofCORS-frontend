import {
  fireEvent,
  render, screen,
} from '@testing-library/react';
import Likes from './Likes';

const context = describe;

describe('Likes', () => {
  const handleClick = jest.fn();

  function renderLikes() {
    render((
      <Likes selected onClick={handleClick} />
    ));
  }

  context('when the button is clicked', () => {
    it('calls handleClick', () => {
      renderLikes();

      fireEvent.click(screen.getByText('like'));

      expect(handleClick).toBeCalled();
    });
  });
});
