import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SolutionsPage from './SolutionsPage';

describe('SolutionsPage', () => {
  it('renders title', async () => {
    render((
      <MemoryRouter initialEntries={['/solutions']}>
        <SolutionsPage />
      </MemoryRouter>
    ));

    await waitFor(() => {
      screen.getByText('해결된 질문');
    });
  });
});
