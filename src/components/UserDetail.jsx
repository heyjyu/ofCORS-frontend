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

  h2 {
    display: flex;
    align-items: center;
    font-size: 1.1em;
    font-weight: 700;
  }
`;

const Wrapper = styled.div`
  margin-block: 1em;
  padding: 2em;
  border: 1px solid #EAEAEC;
  background-color: white;

  div {
    display: flex;

    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0.5em;
      margin-left: 3em;

      p {
        color: #8E8E8E;
      }

      p:first-child {
        font-size: 1.25em;
        font-weight: 500;
        color: black;
      }
    }
  }

  hr {
    margin-top: 1em;
    border: 1px solid #EAEAEC;
  }

  a {
    font-size: 0.9em;
    width: fit-content;
    height: fit-content;
    padding: 0.5em 1em;
    border: 1px solid #EAEAEC;
    border-radius: 0.5em;
  }

  button {
    padding: 0.5em 1em;
    border: 1px solid #EAEAEC;
    background: white;
    color: #8E8E8E;
  }
`;

const ButtonList = styled.ul`
  display: flex;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-block: 1em;
  padding: 1.5em;
  border: 1px solid #EAEAEC;
  background-color: white;
`;

const Image = styled.img`
  border-radius: 50%;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2em;
  padding-bottom: 0.5em;
  border-bottom: 1px solid #E8E8E8;

  button {
    font-size: 0.9em;
    width: fit-content;
    height: fit-content;
    padding: 0.5em 1em;
    border: 1px solid #EAEAEC;
    border-radius: 0.5em;
    background: white;
  }

  div {
    display: flex;
    gap: 0.5em;
  }
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const Like = styled.span`
  display: inline-block;
  padding: 0.4em 0.5em 0.25em;
  border-radius: 0.2em;
  background: #BAA5FF;
  color: white;
`;

const Date = styled.span`
  color: #8E8E8E;
`;

const Point = styled.span`
  display: inline-block;
  padding: 0.4em 0.5em 0.25em;
  border-radius: 0.2em;
  background: ${(props) => (props.selected ? '#7FFFD4' : '#BAA5FF')};
  color: white;
`;

export default function UserVerificationUserDetail() {
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

  const handleClickSortAnswerByTime = () => {
    answerStore.fetchAnswerPreviews({ userId: user.id, sort: 'createdAt' });
  };

  const handleClickSortAnswerByLike = () => {
    answerStore.fetchAnswerPreviews({ userId: user.id, sort: 'like' });
  };

  const handleClickSortQuestionByTime = () => {
    questionStore.fetchQuestionPreviews({ userId: id, sort: 'createdAt' });
  };

  const handleClickSortQuestionByPoint = () => {
    questionStore.fetchQuestionPreviews({ userId: id, sort: 'points' });
  };

  if (!user) {
    return null;
  }

  return (
    <Container>
      <Wrapper>
        <div>
          <Image alt="avatar" src={user.imageUrl} width={100} height={100} />
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
        {/* <button type="button" onClick={handleClickSubscribe}>
          구독
        </button> */}
        <hr />
        <ButtonList>
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
        </ButtonList>
      </Wrapper>
      {tab === 'summary'
        ? (
          <div>
            <div>
              <HeaderWrapper>
                <h2>
                  답변
                </h2>
                <button type="button" onClick={handleClickAnswerTab}>
                  전체보기
                </button>
              </HeaderWrapper>
              <List>
                {answerStore.answerPreviews
                  .slice(0, 5)
                  .map((answer) => (
                    <Item key={answer.id}>
                      <Like>
                        {answer.likeUserIds.length}
                        추천
                      </Like>
                      <Link to={`/questions/${answer.question.id}`}>
                        {answer.question.title}
                      </Link>
                      <Date>
                        {answer.createdAt.split('T')[0].replaceAll('-', '.')}
                      </Date>
                    </Item>
                  ))}
              </List>
            </div>
            <div>
              <HeaderWrapper>
                <h2>
                  질문
                </h2>
                <button type="button" onClick={handleClickQuestionTab}>
                  전체보기
                </button>
              </HeaderWrapper>
              <List>
                {questionStore.questionPreviews
                  .slice(0, 5)
                  .map((question) => (
                    <Item key={question.id}>
                      <Point selected={question.selectedAnswerId > 0}>
                        {question.points}
                        pt
                      </Point>
                      <Link to={`/questions/${question.id}`}>
                        {question.title}
                      </Link>
                      <Date>
                        {question.createdAt.split('T')[0].replaceAll('-', '.')}
                      </Date>
                    </Item>
                  ))}
              </List>
            </div>
          </div>
        ) : null}
      {tab === 'answer'
        ? (
          <>
            <HeaderWrapper>
              <h2>
                답변
              </h2>
              <div>
                <button type="button" onClick={handleClickSortAnswerByLike}>
                  추천순
                </button>
                <button type="button" onClick={handleClickSortAnswerByTime}>
                  최신순
                </button>
              </div>
            </HeaderWrapper>
            <List>
              {answerStore.answerPreviews
                .map((answer) => (
                  <Item key={answer.id}>
                    <Like>
                      {answer.likeUserIds.length}
                      추천
                    </Like>
                    <Link to={`/questions/${answer.question.id}`}>
                      {answer.question.title}
                    </Link>
                    <Date>
                      {answer.createdAt.split('T')[0].replaceAll('-', '.')}
                    </Date>
                  </Item>
                ))}
            </List>
          </>
        ) : null}
      {tab === 'question'
        ? (
          <>
            <HeaderWrapper>
              <h2>
                질문
              </h2>
              <div>
                <button type="button" onClick={handleClickSortQuestionByPoint}>
                  포인트순
                </button>
                <button type="button" onClick={handleClickSortQuestionByTime}>
                  최신순
                </button>
              </div>
            </HeaderWrapper>
            <List>
              {questionStore.questionPreviews
                .map((question) => (
                  <Item key={question.id}>
                    <Point selected={question.selectedAnswerId > 0}>
                      {question.points}
                      pt
                    </Point>
                    <Link to={`/questions/${question.id}`}>
                      {question.title}
                    </Link>
                    <Date>
                      {question.createdAt.split('T')[0].replaceAll('-', '.')}
                    </Date>
                  </Item>
                ))}
            </List>
          </>
        ) : null}
    </Container>
  );
}
