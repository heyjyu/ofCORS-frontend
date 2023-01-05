import {
  render, screen,
} from '@testing-library/react';
import { answerFormStore } from '../stores/AnswerFormStore';
import AnswerForm from './AnswerForm';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

describe('AnswerForm', () => {
  const handleSubmit = jest.fn();

  function renderAnswerForm() {
    render((
      <AnswerForm onSubmit={handleSubmit} />
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
    answerFormStore.reset();
  });

  it('renders title', async () => {
    renderAnswerForm();

    screen.getByText('답변하기');
  });
});
