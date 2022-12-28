import {
  render, fireEvent, screen, waitFor,
} from '@testing-library/react';
import { questionFormStore } from '../stores/QuestionFormStore';
import QuestionForm from './QuestionForm';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

describe('QuestionForm', () => {
  function renderQuestionForm() {
    render((
      <QuestionForm />
    ));
  }

  beforeEach(() => {
    questionFormStore.reset();
  });

  context('when successfully asked a question', () => {
    it('navigates to the questions page', async () => {
      await questionFormStore.fetchPoints();

      renderQuestionForm();

      fireEvent.change(screen.getByLabelText('질문 제목'), {
        target: { value: 'No \'Access-Control-Allow-Origin\' header' },
      });

      fireEvent.change(screen.getByLabelText('상황 설명'), {
        target: { value: '서버를 배포 후 특정 요청에서 CORS에러가 발생합니다.' },
      });

      fireEvent.change(screen.getByLabelText('태그'), {
        target: { value: 'Web' },
      });

      fireEvent.click(screen.getByText('추가'));

      fireEvent.change(screen.getByLabelText('포인트'), {
        target: { value: 20 },
      });

      fireEvent.click(screen.getByText('올리기'));

      await waitFor(() => {
        screen.getByText('예');
      });

      fireEvent.click(screen.getByText('예'));

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/questions');
      });
    });
  });

  context('without enough points', () => {
    it('renders error message', async () => {
      renderQuestionForm();

      fireEvent.change(screen.getByLabelText('질문 제목'), {
        target: { value: 'No \'Access-Control-Allow-Origin\' header' },
      });

      fireEvent.change(screen.getByLabelText('상황 설명'), {
        target: { value: '서버를 배포 후 특정 요청에서 CORS에러가 발생합니다.' },
      });

      fireEvent.change(screen.getByLabelText('태그'), {
        target: { value: 'Web' },
      });

      fireEvent.click(screen.getByText('추가'));

      fireEvent.change(screen.getByLabelText('포인트'), {
        target: { value: 2000 },
      });

      await waitFor(() => {
        screen.getByText(/보유 포인트보다 많은 포인트를 입력하셨습니다/);
      });
    });
  });

  context('with empty title', () => {
    it('renders error message', async () => {
      renderQuestionForm();

      fireEvent.change(screen.getByLabelText('상황 설명'), {
        target: { value: '서버를 배포 후 특정 요청에서 CORS에러가 발생합니다.' },
      });

      fireEvent.change(screen.getByLabelText('태그'), {
        target: { value: 'Web' },
      });

      fireEvent.click(screen.getByText('추가'));

      fireEvent.change(screen.getByLabelText('포인트'), {
        target: { value: 20 },
      });

      fireEvent.click(screen.getByText('올리기'));

      await waitFor(() => {
        screen.getByText(/제목을 입력해주세요/);
      });
    });
  });

  context('with empty body', () => {
    it('renders error message', async () => {
      renderQuestionForm();

      fireEvent.change(screen.getByLabelText('질문 제목'), {
        target: { value: 'No \'Access-Control-Allow-Origin\' header' },
      });

      fireEvent.change(screen.getByLabelText('태그'), {
        target: { value: 'Web' },
      });

      fireEvent.click(screen.getByText('추가'));

      fireEvent.change(screen.getByLabelText('포인트'), {
        target: { value: 20 },
      });

      fireEvent.click(screen.getByText('올리기'));

      await waitFor(() => {
        screen.getByText(/상황을 설명해주세요/);
      });
    });
  });
});
