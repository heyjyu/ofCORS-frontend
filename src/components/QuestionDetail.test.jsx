import {
  fireEvent,
  render, screen,
} from '@testing-library/react';
import { questionStore } from '../stores/QuestionStore';
import QuestionDetail from './QuestionDetail';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line react/prop-types
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate() {
    return navigate;
  },
  useParams() {
    return { id: 1 };
  },
}));

const context = describe;

describe('QuestionDetail', () => {
  function renderQuestionDetail() {
    render((
      <QuestionDetail />
    ));
  }

  it('renders title', async () => {
    localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));
    await questionStore.fetchQuestion(1);

    renderQuestionDetail();

    screen.getByText('No \'Access-Control-Allow-Origin\'');
  });

  context('when not logged in', () => {
    context('when the answer is submitted', () => {
      it('navigates to login page', async () => {
        localStorage.setItem('accessToken', '');

        await questionStore.fetchQuestion(1);
        renderQuestionDetail();
        fireEvent.change(screen.getByRole('textbox'), '헤더를 추가해보세요');
        fireEvent.click(screen.getByText('등록'));
        expect(navigate).toBeCalledWith('/login');
      });
    });
  });
});
