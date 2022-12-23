import {
  render, screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { topQuestionStore } from '../stores/TopQuestionStore';
import TopQuestions from './TopQuestions';

const context = describe;

describe('TopQuestions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderTopQuestions() {
    render((
      <MemoryRouter initialEntries={['/']}>
        <TopQuestions />
      </MemoryRouter>
    ));
  }

  context('without question', () => {
    it('renders "질문을 등록해주세요!" message', () => {
      topQuestionStore.isQuestionsLoaded = true;
      topQuestionStore.questions = [];
      renderTopQuestions();

      screen.getByText('질문을 등록해주세요!');
    });
  });

  context('with questions', () => {
    it('renders question title', async () => {
      await topQuestionStore.fetchQuestions({ period: 'week' });
      renderTopQuestions();

      screen.getByText(/Access-Control-Allow-Origin/);
    });
  });
});
