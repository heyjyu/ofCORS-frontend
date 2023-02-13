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
import Title from './ui/Title';

const Container = styled.div`
  height: 100%;
  padding: 0.5em 1em;

  h2 {
    font-size: 1.1em;
    font-weight: 700;
    margin-top: 2.5em;
    padding-bottom: 1em;
    border-bottom: 1px solid #E8E8E8;
  }
`;

const Wrapper = styled.div`
  margin-block: 1em;
  padding: 2em;
  border: 1px solid #EAEAEC;
  background-color: white;

  div {
    display: flex;
    gap: 1em;
  }

  hr {
    margin-top: 1em;
    border: 1px solid #E8E8E8;
  }
`;

const QuestionBody = styled.p`
  width: 100%;
  padding-block: 1em;
`;

const Footer = styled.div`
  margin-top: 1em;
  color: #8E8E8E;

  a {
    color: #8E8E8E;
  }

  p::after {
    content: "|";
    margin-left: 1em;
    color: #EAEAEC;
  }

  >div:first-child {
    flex: 1;
  }
`;

const StyledLink = styled(Link)`
  font-size: 0.9em;
  display: flex;
  align-items: center;
  padding: 0.5em 1em;
  border: 1px solid #EAEAEC;
  background: white;
  color: #8E8E8E;
`;

const Button = styled.button`
  padding: 0.5em 1em;
  border: 1px solid #EAEAEC;
  background: white;
  color: #8E8E8E;
  white-space: nowrap;
`;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  >button {
    font-size: 0.9em;
    padding: 0.5em 1em;
    border: 1px solid #EAEAEC;
    background: white;
    color: #8E8E8E;
  }
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
    points, title, createdAt,
    hits, body, author, likeUserIds,
    scrapUserIds, status, selectedAnswerId,
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

  const handleClickScrap = () => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    questionStore.scrap(id);
  };

  const handleClickCancelScrap = () => {
    questionStore.cancelScrap(id);
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
        <div>
          <Point amount={points} />
          <Title>{title}</Title>
        </div>
        <hr />
        <QuestionBody>{body}</QuestionBody>
        <Footer>
          <div>
            <p>{createdAt.split('T')[0]}</p>
            <p>
              조회수
              {' '}
              {hits}
            </p>
            <p>
              추천수
              {' '}
              {likeUserIds.length}
            </p>
            <Link to={`/users/${author.id}`}>{author.displayName}</Link>
          </div>
          <div>
            {questionStore.isMyQuestion(userStore.user?.id) && answerStore.answers.length === 0
              ? (
                <>
                  <StyledLink to={`/questions/${question.id}/edit`}>
                    수정
                  </StyledLink>
                  <ModalWrapper>
                    <Modal
                      buttonName="삭제"
                      content="질문을 정말 삭제하시겠습니까?"
                      onClose={handleClickDelete}
                    />
                  </ModalWrapper>
                </>
              ) : (
                <Likes
                  selected={likeUserIds.map((i) => i.id).includes(userStore.user?.id)}
                  onClick={handleClickLike}
                />
              )}
            {scrapUserIds.map((i) => i.id).includes(userStore.user?.id)
              ? (
                <Button type="button" onClick={handleClickCancelScrap}>
                  스크랩 취소
                </Button>
              ) : (
                <Button type="button" onClick={handleClickScrap}>
                  스크랩
                </Button>
              )}
          </div>
        </Footer>
      </Wrapper>
      <h2>
        답변
        {' '}
        {answerStore.answers.length}
        개
      </h2>
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
