import {
  render, screen,
} from '@testing-library/react';
import { questionStore } from '../stores/QuestionStore';
import Questions from './Questions';

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

describe('Questions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderQuestions() {
    render((
      <Questions />
    ));
  }

  context('without question', () => {
    it('renders "질문을 등록해주세요!" message', () => {
      questionStore.isQuestionsLoaded = true;
      questionStore.questions = [];
      renderQuestions();

      screen.getByText('질문을 등록해주세요!');
    });
  });

  context('with questions', () => {
    it('renders question title', async () => {
      await questionStore.fetchQuestions();
      renderQuestions();

      screen.getByText(/Access-Control-Allow-Origin/);
    });
  });
});
