import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useAnswerStore from '../hooks/useAnswerStore';
import useQuestionStore from '../hooks/useQuestionStore';
import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  height: 100%;
  padding: 0.5em 1em;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1em;
  width: 100%;
  margin-block: 1em;
`;

const List = styled.ul`
  display: flex;
`;

export default function UserDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [accessToken] = useLocalStorage('accessToken', '');
  const userStore = useUserStore();
  const answerStore = useAnswerStore();
  const questionStore = useQuestionStore();
  const [tab, setTab] = useState('summary');

  const { user } = userStore;

  const handleClickSubscribe = () => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    // TODO
    userStore.subscribe(id);
  };

  const handleClickSummaryTab = () => {
    setTab('summary');
  };

  const handleClickAnswerTab = () => {
    setTab('answer');
  };

  const handleClickQuestionTab = () => {
    setTab('question');
  };

  if (!user) {
    return null;
  }

  return (
    <Container>
      <Wrapper>
        <div>
          <img alt="avatar" src={user.imageUrl} />
          <div>
            <p>
              {user.displayName}
            </p>
            <p>
              {user.about}
            </p>
            <p>
              {user.countOfLikes}
              {' '}
              추천
            </p>
          </div>
        </div>
        <button type="button" onClick={handleClickSubscribe}>
          구독
        </button>
      </Wrapper>
      <List>
        <li>
          <button type="button" onClick={handleClickSummaryTab}>
            요약
          </button>
        </li>
        <li>
          <button type="button" onClick={handleClickAnswerTab}>
            답변
          </button>
        </li>
        <li>
          <button type="button" onClick={handleClickQuestionTab}>
            질문
          </button>
        </li>
      </List>
      {tab === 'summary'
        ? (
          <div>
            <div>
              <Wrapper>
                <h2>
                  답변
                </h2>
                <button type="button" onClick={handleClickAnswerTab}>
                  전체보기
                </button>
              </Wrapper>
              <ul>
                {answerStore.answerPreviews
                  .slice(0, 5)
                  .map((answer) => (
                    <li key={answer.id}>
                      <span>
                        {answer.likeUserIds.length}
                        추천
                      </span>
                      <Link to={`/questions/${answer.question.id}`}>
                        {answer.question.title}
                      </Link>
                      <span>
                        {answer.createdAt.split('T')[0].replaceAll('-', '.')}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <Wrapper>
                <h2>
                  질문
                </h2>
                <button type="button" onClick={handleClickAnswerTab}>
                  전체보기
                </button>
              </Wrapper>
              <ul>
                {questionStore.questionPreviews
                  .slice(0, 5)
                  .map((question) => (
                    <li key={question.id}>
                      <span>
                        {question.likeUserIds.length}
                        추천
                      </span>
                      <Link to={`/questions/${question.id}`}>
                        {question.title}
                      </Link>
                      <span>
                        {question.createdAt.split('T')[0].replaceAll('-', '.')}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ) : null}
      {tab === 'answer'
        ? (
          <>
            <div>
              답변
            </div>
            <ul>
              {answerStore.answerPreviews
                .map((answer) => (
                  <li key={answer.id}>
                    <span>
                      {answer.likeUserIds.length}
                      추천
                    </span>
                    <Link to={`/questions/${answer.question.id}`}>
                      {answer.question.title}
                    </Link>
                    <span>
                      {answer.createdAt.split('T')[0].replaceAll('-', '.')}
                    </span>
                  </li>
                ))}
            </ul>
          </>
        ) : null}
      {tab === 'question'
        ? (
          <>
            <div>
              질문
            </div>
            <ul>
              {questionStore.questionPreviews
                .map((question) => (
                  <li key={question.id}>
                    <span>
                      {question.likeUserIds.length}
                      추천
                    </span>
                    <Link to={`/questions/${question.id}`}>
                      {question.title}
                    </Link>
                    <span>
                      {question.createdAt.split('T')[0].replaceAll('-', '.')}
                    </span>
                  </li>
                ))}
            </ul>
          </>
        ) : null}
    </Container>
  );
}
