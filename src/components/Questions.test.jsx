import {
  render, screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { questionStore } from '../stores/QuestionStore';
import Questions from './Questions';

const context = describe;

describe('Questions', () => {
  function renderQuestions() {
    render((
      <MemoryRouter initialEntries={['/questions']}>
        <Questions />
      </MemoryRouter>
    ));
  }

  context('without question', () => {
    it('renders "질문이 아직 없습니다!" message', () => {
      questionStore.isQuestionsLoading = false;
      questionStore.questions = [];
      renderQuestions();

      screen.getByText('질문이 아직 없습니다!');
    });
  });

  context('with questions', () => {
    it('renders question title', async () => {
      await questionStore.fetchQuestions({ sort: 'createdAt' });
      renderQuestions();

      screen.getByText(/Access-Control-Allow-Origin/);
    });
  });
});
