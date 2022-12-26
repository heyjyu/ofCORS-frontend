import {
  render, screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { solutionStore } from '../stores/SolutionStore';
import Solutions from './Solutions';

const context = describe;

describe('Solutions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderSolutions() {
    render((
      <MemoryRouter initialEntries={['/solutions']}>
        <Solutions />
      </MemoryRouter>
    ));
  }

  context('without solution', () => {
    it('renders "해결된 질문이 아직 없습니다!" message', () => {
      solutionStore.isSolutionsLoading = false;
      solutionStore.solutions = [];
      renderSolutions();

      screen.getByText('해결된 질문이 아직 없습니다!');
    });
  });

  context('with solutions', () => {
    it('renders title', async () => {
      await solutionStore.fetchSolutions({ sort: 'createdAt' });
      renderSolutions();

      screen.getByText(/Access-Control-Allow-Origin/);
    });
  });
});
