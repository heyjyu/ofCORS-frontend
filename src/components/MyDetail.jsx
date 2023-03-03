import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAnswerStore from '../hooks/useAnswerStore';
import useQuestionStore from '../hooks/useQuestionStore';
import useUserStore from '../hooks/useUserStore';
import Tags from './Tags';

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
  padding: 1em;
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
  margin-top: 1em;
  display: flex;
  gap: 0.5em;
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

const PointWrapper = styled.div`
  margin-block: 1em;
  padding: 1.5em;
  border: 1px solid #EAEAEC;
  background-color: white;
  color: #8E8E8E;

  div {
    display: flex;
    align-items: center;
    gap: 1em;
    margin-block: 1em;

    p {
      color: #FF424D;
    }
  }
`;

const Point = styled.span`
  font-size: 2em;
  font-weight: 700;
  color: black;
`;

const ChargeButton = styled.button`
  padding: 0.5em 1em;
  border: none;
  background: #777677;
  color: white;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5em;
  border: none;
  background: transparent;
  color: #8E8E8E;
`;

export default function MyDetail() {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const answerStore = useAnswerStore();
  const questionStore = useQuestionStore();
  const [tab, setTab] = useState('summary');

  const { user } = userStore;

  const handleClickSummaryTab = () => {
    setTab('summary');
  };

  const handleClickAnswerTab = () => {
    setTab('answer');
  };

  const handleClickQuestionTab = () => {
    setTab('question');
  };

  const handleClickScrapTab = () => {
    setTab('scrap');
  };

  const handleClickSubscriptionTab = () => {
    setTab('subscription');
  };

  const handleClickSortAnswerByTime = () => {
    answerStore.fetchAnswerPreviews({ userId: user.id, sort: 'createdAt' });
  };

  const handleClickSortAnswerByLike = () => {
    answerStore.fetchAnswerPreviews({ userId: user.id, sort: 'like' });
  };

  const handleClickSortQuestionByTime = () => {
    questionStore.fetchQuestionPreviews({ userId: user.id, sort: 'createdAt' });
  };

  const handleClickSortQuestionByPoint = () => {
    questionStore.fetchQuestionPreviews({ userId: user.id, sort: 'points' });
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
              추천수
              {' '}
              {user.countOfLikes}
            </p>
          </div>
          <Link to="/mypage/modify">
            수정
          </Link>
        </div>
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
          <li>
            <button type="button" onClick={handleClickScrapTab}>
              스크랩
            </button>
          </li>
          {/* <li>
          <button type="button" onClick={handleClickSubscriptionTab}>
            구독
          </button>
        </li> */}
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
                      <Like>
                        {question.likeUserIds.length}
                        추천
                      </Like>
                      <div>
                        <Link to={`/questions/${question.id}`}>
                          {question.title}
                        </Link>
                        <Tags tags={question.tags} />
                      </div>
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
                    {/* TODO 채택 여부에 따라 배경색 바꾸기 */}
                    <Like>
                      {question.likeUserIds.length}
                      추천
                    </Like>
                    <Link to={`/questions/${question.id}`}>
                      {question.title}
                    </Link>
                    <Date>
                      {question.createdAt.split('T')[0].replaceAll('-', '.')}
                    </Date>
                    <Tags tags={question.tags} />
                  </Item>
                ))}
            </List>
          </>
        ) : null}
      {tab === 'scrap'
        ? (
          <>
            <HeaderWrapper>
              <h2>
                스크랩
              </h2>
            </HeaderWrapper>
            <List>
              {questionStore.scrappedQuestions
                .map((question) => (
                  <Item key={question.id}>
                    {/* TODO 채택 여부에 따라 배경색 바꾸기 */}
                    <Like>
                      {question.likeUserIds.length}
                      추천
                    </Like>
                    <Link to={`/questions/${question.id}`}>
                      {question.title}
                    </Link>
                    <Date>
                      {question.createdAt.split('T')[0].replaceAll('-', '.')}
                    </Date>
                    <Tags tags={question.tags} />
                  </Item>
                ))}
            </List>
          </>
        ) : null}
      {/* {tab === 'subscription'
        ? (
          <div>
            구독
          </div>
        ) : null} */}
      <div>
        <HeaderWrapper>
          <h2>
            포인트
          </h2>
        </HeaderWrapper>
        <PointWrapper>
          <div>
            보유 포인트
          </div>
          <div>
            <img alt="coin" src="assets/images/coin.svg" width={30} height={30} />
            <Point>
              {user.points}
            </Point>
            <ChargeButton type="button" onClick={() => navigate('/charge')}>
              포인트 충전
            </ChargeButton>
            {user.realName === ''
              ? (
                <p>* 실명 인증 후 환전 가능합니다.</p>
              )
              : null}
          </div>
          <div>
            {/* {user.realName === ''
              ? (
                <Button type="button" onClick={() => navigate('/verify-user')}>
                  실명 인증
                <img alt="right-arrow" src="assets/images/right-arrow.svg" width={18} height={18} />
                </Button>
              )
              : null}
            {user.realName !== ''
              ? ( */}
            <Button type="button" onClick={() => navigate('/exchange')}>
              환전하기
              <img alt="right-arrow" src="assets/images/right-arrow.svg" width={18} height={18} />
            </Button>
            {/* )
              : null} */}
            {/* <button type="button">
            구매 내역
          </button> */}
          </div>
        </PointWrapper>
      </div>
    </Container>
  );
}
