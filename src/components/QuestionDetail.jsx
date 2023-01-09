import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useAnswerFormStore from '../hooks/useAnswerFormStore';
import useAnswerStore from '../hooks/useAnswerStore';
import useQuestionStore from '../hooks/useQuestionStore';
import useUserStore from '../hooks/useUserStore';
import Answer from './Answer';
import AnswerForm from './AnswerForm';
import Likes from './Likes';
import Point from './Point';
import Modal from './ui/Modal';

const Container = styled.div`
  height: 100%;
`;

const Title = styled.h1`
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

export default function QuestionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [accessToken] = useLocalStorage('accessToken', '');
  const questionStore = useQuestionStore();
  const answerStore = useAnswerStore();
  const answerFormStore = useAnswerFormStore();
  const userStore = useUserStore();

  if (questionStore.isQuestionLoading || !questionStore.question) {
    return (
      <p>
        Loading...
      </p>
    );
  }

  const { question } = questionStore;
  const {
    points, title, createdAt, hits, body, author, likeUserIds, status, selectedAnswerId,
  } = question;

  const handleClickLike = () => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    questionStore.toggleLike(id);
  };

  const handleClickDelete = () => {
    questionStore.delete(id);
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!accessToken) {
      navigate('/login');

      return;
    }

    answerFormStore.validate();

    if (answerFormStore.isValidateSuccessful) {
      answerStore.write({ questionId: question.id, body: answerFormStore.fields.body });
      answerFormStore.reset();
    }
  };

  return (
    <Container>
      <Wrapper>
        <Point amount={points} />
        {questionStore.isMyQuestion(userStore.user?.id) && answerStore.answers.length === 0
          ? (
            <>
              <Link to={`/questions/${question.id}/edit`}>
                수정
              </Link>
              <Modal
                buttonName="삭제"
                content="질문을 정말 삭제하시겠습니까?"
                onClose={handleClickDelete}
              />
            </>
          ) : null}
        <button type="button">
          스크랩
        </button>
      </Wrapper>
      <Title>{title}</Title>
      <Wrapper>
        <p>{createdAt.split('T')[0]}</p>
        <p>
          {hits}
          {' '}
          조회
        </p>
        <Link to={`/users/${author.id}`}>{author.displayName}</Link>
      </Wrapper>
      <Wrapper>
        <Likes
          count={likeUserIds.length}
          selected={likeUserIds.map((i) => i.id).includes(userStore.user?.id)}
          onClick={handleClickLike}
        />
        <p>{body}</p>
      </Wrapper>
      <div>
        {answerStore.answers.length}
        {' '}
        답변
      </div>
      {answerStore.answers.map((answer) => (
        <Answer
          key={answer.id}
          answer={answer}
          adoptable={status === 'open' && questionStore.isMyQuestion(userStore.user?.id)}
          selected={selectedAnswerId === answer.id}
        />
      ))}
      {questionStore.isMyQuestion(userStore.user?.id)
        ? null : (
          <AnswerForm onSubmit={handleSubmit} />
        )}
    </Container>
  );
}
