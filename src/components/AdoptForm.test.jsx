import {
  render, fireEvent, screen, waitFor,
} from '@testing-library/react';
import { selectAnswerFormStore } from '../stores/SelectAnswerFormStore';
import AdoptForm from './AdoptForm';

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

describe('AdoptForm', () => {
  function renderAdoptForm() {
    render((
      <AdoptForm />
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
    selectAnswerFormStore.reset();
  });

  context('when successfully adopted an answer', () => {
    it('navigates to the question page', async () => {
      await selectAnswerFormStore.fetchPoints();

      renderAdoptForm();

      fireEvent.change(screen.getByLabelText('감사 메시지'), {
        target: { value: '감사합니다.' },
      });

      fireEvent.change(screen.getByLabelText('추가 포인트 (보유 포인트: 100)'), {
        target: { value: 10 },
      });

      fireEvent.click(screen.getByText('보내기'));

      await waitFor(() => {
        expect(navigate).toBeCalled();
      });
    });
  });

  context('without enough points', () => {
    it('renders error message', async () => {
      renderAdoptForm();

      fireEvent.change(screen.getByLabelText('감사 메시지'), {
        target: { value: '감사합니다.' },
      });

      fireEvent.change(screen.getByLabelText('추가 포인트 (보유 포인트: 100)'), {
        target: { value: 2000 },
      });

      await waitFor(() => {
        screen.getByText(/보유 포인트보다 많은 포인트를 입력하셨습니다/);
      });
    });
  });
});
