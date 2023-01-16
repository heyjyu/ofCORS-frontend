import {
  fireEvent,
  render, screen,
} from '@testing-library/react';
import { userStore } from '../stores/UserStore';
import MyDetail from './MyDetail';

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

describe('MyDetail', () => {
  const renderMyDetail = () => {
    render((
      <MyDetail />
    ));
  };

  it('renders user information', async () => {
    await userStore.fetchMe();

    renderMyDetail();

    screen.getByText('hong');
    screen.getByText(/추천/);
  });
});
