import {
  render, screen,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { questionStore } from '../stores/QuestionStore';
import QuestionDetail from './QuestionDetail';

describe('QuestionDetail', () => {
  function renderQuestionDetail() {
    render((
      <MemoryRouter initialEntries={['/questions/1']}>
        <QuestionDetail />
      </MemoryRouter>
    ));
  }

  it('renders title', async () => {
    await questionStore.fetchQuestion(1);

    renderQuestionDetail();

    screen.getByText('No \'Access-Control-Allow-Origin\'');
  });
});
