import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useAnswerFormStore from '../hooks/useAnswerFormStore';
import useAnswerStore from '../hooks/useAnswerStore';
import useQuestionStore from '../hooks/useQuestionStore';
import useSelectAnswerFormStore from '../hooks/useSelectAnswerFormStore';
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
  const navigate = useNavigate();
  const { id } = useParams();
  const [accessToken] = useLocalStorage('accessToken', '');
  const questionStore = useQuestionStore();
  const answerStore = useAnswerStore();
  const answerFormStore = useAnswerFormStore();
  const selectAnswerFormStore = useSelectAnswerFormStore();
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!accessToken) {
      navigate('/login');

      return;
    }

    answerStore.write({ questionId: question.id, body: answerFormStore.fields.body });

    answerFormStore.reset();
  };

  const handleClickSelect = ({ answerId }) => {
    // TODO adopt 페이지는 내가 질문 작성자가 아닌 경우 접근할 수 없다
    selectAnswerFormStore.selectAnswerId(answerId);

    navigate(`/questions/${id}/adopt`);
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
      <div>
        {answerStore.answers.length}
        {' '}
        답변
      </div>
      {answerStore.answers.map((answer) => (
        <Wrapper key={answer.id}>
          <div>
            <Likes
              count={answer.likeUserIds.length}
              selected={answer.likeUserIds.includes(userStore.user?.id)}
            />
            {status === 'open' && questionStore.isMyQuestion(userStore.user?.id)
              ? (
                <button type="button" onClick={() => handleClickSelect({ answerId: answer.id })}>
                  채택
                </button>
              ) : null}
            {selectedAnswerId === answer.id
              ? (
                <div>
                  v
                </div>
              ) : null}
          </div>
          <p>
            {answer.body}
          </p>
        </Wrapper>
      ))}
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
