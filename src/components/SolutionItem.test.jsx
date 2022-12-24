import {
  render, screen,
} from '@testing-library/react';
import SolutionItem from './SolutionItem';

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

describe('SolutionItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderSolutionItem({ solution }) {
    render((
      <SolutionItem solution={solution} />
    ));
  }

  it('renders title', async () => {
    const solution = {
      id: 1,
      status: 'closed',
      title: 'No \'Access-Control-Allow-Origin\' 에러가 뜹니다',
      body: '서버 배포 후 CORS에러가 발생합니다.',
      tags: ['Web'],
      points: 10,
      likeUserIds: [11],
      hits: 3,
      createdAt: '2022-12-21T19:05:30.574542',
      updatedAt: '2022-12-21T19:05:30.574542',
      authorId: 1,
    };

    renderSolutionItem({ solution });

    screen.getByText(/Access-Control-Allow-Origin/);
  });
});
