import { Link } from 'react-router-dom';
import useQuestionStore from '../hooks/useQuestionStore';
import Point from './Point';

export default function QuestionDetail() {
  const questionStore = useQuestionStore();

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

  return (
    <div>
      <Point amount={points} />
      <h1>{title}</h1>
      <p>{createdAt.split('T')[0]}</p>
      <p>
        {hits}
        {' '}
        조회
      </p>
      <p>{likeUserIds.length}</p>
      <button type="button">
        ❤️
      </button>
      <p>{body}</p>
      <Link to={`/users/${author.id}`}>{author.displayName}</Link>
    </div>
  );
}
