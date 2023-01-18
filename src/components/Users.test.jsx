import {
  render, screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Users from './Users';

describe('Users', () => {
  function renderUsers() {
    render((
      <MemoryRouter initialEntries={['/users']}>
        <Users />
      </MemoryRouter>
    ));
  }

  it('renders title, search bar', () => {
    renderUsers();

    screen.getByText('사람들');
    screen.getByPlaceholderText('검색');
  });
});
