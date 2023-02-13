import {
  render, screen,
} from '@testing-library/react';
import { userStore } from '../stores/UserStore';
import UserDetail from './UserDetail';

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

// const context = describe;

describe('UserDetail', () => {
  const renderUserDetail = () => {
    render((
      <UserDetail />
    ));
  };

  it('renders user information', async () => {
    await userStore.fetchUser(1);

    renderUserDetail();

    screen.getByText('hong');
    screen.getByText(/추천/);
  });

  // context('when not logged in', () => {
  //   context('when the subscribe button is clicked', () => {
  //     it('navigates to login page', async () => {
  //       localStorage.setItem('accessToken', '');

  //       await userStore.fetchUser(1);

  //       renderUserDetail();

  //       fireEvent.click(screen.getByText('구독'));
  //       expect(navigate).toBeCalledWith('/login');
  //     });
  //   });
  // });
});
