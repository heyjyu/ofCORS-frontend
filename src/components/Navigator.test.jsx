import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigator from './Navigator';

describe('Header', () => {
  function renderHeader() {
    render((
      <MemoryRouter initialEntries={['/']}>
        <Navigator />
      </MemoryRouter>
    ));
  }

  it('renders links', () => {
    renderHeader();

    screen.getByText('홈');
    screen.getByText('질문');
    screen.getByText('해결완료');
    screen.getByText('사람들');
  });
});
