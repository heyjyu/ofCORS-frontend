import {
  render, screen,
} from '@testing-library/react';
import { topQuestionsStore } from '../stores/TopQuestionsStore';
import TopQuestions from './TopQuestions';

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

const context = describe;

describe('TopQuestions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderTopQuestions() {
    render((
      <TopQuestions />
    ));
  }

  context('without question', () => {
    it('renders "질문을 등록해주세요!" message', () => {
      topQuestionsStore.fields.isQuestionsLoaded = true;
      topQuestionsStore.fields.questions = [];
      renderTopQuestions();

      screen.getByText('질문을 등록해주세요!');
    });
  });

  context('with questions', () => {
    it('renders question title', async () => {
      await topQuestionsStore.fetchQuestions({ period: 'week' });
      renderTopQuestions();

      screen.getByText(/Access-Control-Allow-Origin/);
    });
  });
});
