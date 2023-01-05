import {
  render, screen,
} from '@testing-library/react';
import Answer from './Answer';

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
  useParams() {
    return { id: 1 };
  },
}));

const context = describe;

describe('Answer', () => {
  function renderAnswer({ adoptable, selected }) {
    const answer = {
      id: 1,
      questionId: 1,
      body: '헤더를 추가해보세요',
      likeUserIds: [11],
      createdAt: '2022-12-21T19:05:30.574542',
      updatedAt: '2022-12-21T19:05:30.574542',
      author: { id: 2, displayName: '동길홍' },
    };

    render((
      <Answer answer={answer} adoptable={adoptable} selected={selected} />
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  context('when the answer is adoptable', () => {
    it('renders adopt button', async () => {
      renderAnswer({ adoptable: true, selected: false });

      screen.getByText('채택');
    });
  });

  context('when the answer is selected', () => {
    it('renders adopt button', async () => {
      renderAnswer({ adoptable: false, selected: true });

      screen.getByText('v');
    });
  });
});
