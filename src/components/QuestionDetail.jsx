import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useAnswerFormStore from '../hooks/useAnswerFormStore';
import useAnswerStore from '../hooks/useAnswerStore';
import useQuestionStore from '../hooks/useQuestionStore';
import useUserStore from '../hooks/useUserStore';
import Likes from './Likes';
import Point from './Point';

const Title = styled.h1`
  font-weight: bold;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

export default function QuestionDetail() {
  const questionStore = useQuestionStore();
  const answerStore = useAnswerStore();
  const answerFormStore = useAnswerFormStore();
  const userStore = useUserStore();
  const navigate = useNavigate();
  const [accessToken] = useLocalStorage('accessToken', '');

  if (questionStore.isQuestionLoading || !questionStore.question) {
    return (
      <p>
        Loading...
      </p>
    );
  }

  const { question } = questionStore;
  const {
    points, title, createdAt, hits, body, author, likeUserIds,
  } = question;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!accessToken) {
      navigate('/login');

      return;
    }

    answerStore.write({ questionId: question.id, body });

    answerFormStore.reset();
  };

  return (
    <div>
      <Point amount={points} />
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
          selected={likeUserIds.includes(userStore.user?.id)}
        />
        <p>{body}</p>
      </Wrapper>
      {questionStore.isMyQuestion(userStore.user?.id)
        ? (
          null
        ) : (
          <>
            <p>답변하기</p>
            <form onSubmit={handleSubmit}>
              <textarea
                name="input-answer"
                value={answerFormStore.fields.body || ''}
                onChange={(e) => answerFormStore.changeBody(e.target.value)}
              />
              <button type="submit">
                등록
              </button>
            </form>
          </>
        )}
    </div>
  );
}
