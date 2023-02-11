import {
  render, fireEvent, screen, waitFor,
} from '@testing-library/react';
import { questionFormStore } from '../stores/QuestionFormStore';
import { questionStore } from '../stores/QuestionStore';
import QuestionEditForm from './QuestionEditForm';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
  useParams() {
    return { id: 1 };
  },
}));

describe('QuestionEditForm', () => {
  function renderQuestionEditForm() {
    render((
      <QuestionEditForm />
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
    questionFormStore.reset();
  });

  context('when successfully edited a question', () => {
    it('navigates to the question detail page', async () => {
      await questionStore.fetchQuestion(1);
      renderQuestionEditForm();

      fireEvent.change(screen.getByPlaceholderText(/제목/), {
        target: { value: 'No \'Access-Control-Allow-Origin\' header 에러 메시지가 발생합니다' },
      });

      fireEvent.click(screen.getByText('수정'));

      await waitFor(() => {
        screen.getByText('예');
      });

      fireEvent.click(screen.getByText('예'));

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/questions/1');
      });
    });
  });

  context('with empty title', () => {
    it('renders error message', async () => {
      await questionStore.fetchQuestion(1);
      renderQuestionEditForm();

      fireEvent.change(screen.getByPlaceholderText(/제목/), {
        target: { value: '' },
      });

      screen.getByText(/제목을 입력해주세요/);
    });
  });

  context('with empty body', () => {
    it('renders error message', async () => {
      await questionStore.fetchQuestion(1);
      renderQuestionEditForm();

      fireEvent.change(screen.getByPlaceholderText(/문의/), {
        target: { value: '' },
      });

      await waitFor(() => {
        screen.getByText(/상황을 설명해주세요/);
      });
    });
  });
});
