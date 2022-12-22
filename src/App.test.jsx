import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('App', async () => {
  render((
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  ));

  await waitFor(() => {
    screen.getByText('인기 질문');
  });
});
