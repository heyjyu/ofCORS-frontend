import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useAnswerEditFormStore from '../hooks/useAnswerEditFormStore';
import useAnswerStore from '../hooks/useAnswerStore';
import useQuestionStore from '../hooks/useQuestionStore';
import useSelectAnswerFormStore from '../hooks/useSelectAnswerFormStore';
import useUserStore from '../hooks/useUserStore';
import Likes from './Likes';
import Textarea from './ui/Textarea';

const Container = styled.div`
  margin-block: 1em;
  padding: 2em 2em 1em;
  border: 1px solid #EAEAEC;
  background-color: white;
  color: #8E8E8E;

  div {
    display: flex;
    gap: 1em;
  }
`;

const Wrapper = styled.div`
  button {
    padding: 0.5em 1em;
    border: 1px solid #EAEAEC;
    background: white;
    color: #8E8E8E;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  font-size: 1em;
  padding: 1em 2em;
  border: 1px solid #AB92FF;
  border-radius: 0.25em;
  background: #BAA5FF;
  color: white;
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

  div:first-child {
    flex: 1;
  }
`;

export default function Answer({ answer, adoptable, selected }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const answerStore = useAnswerStore();
  const questionStore = useQuestionStore();
  const answerEditFormStore = useAnswerEditFormStore();
  const selectAnswerFormStore = useSelectAnswerFormStore();
  const userStore = useUserStore();
  const [accessToken] = useLocalStorage('accessToken', '');
  const [isEditMode, setIsEditMode] = useState(false);

  const handleClickSelect = ({ answerId }) => {
    selectAnswerFormStore.selectAnswerId(answerId);

    navigate(`/questions/${id}/adopt`);
  };

  const handleClickLike = () => {
    if (!accessToken) {
      navigate('/login');

      return;
    }

    answerStore.toggleLike(answer.id);
  };

  const handleClickEdit = () => {
    setIsEditMode(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    answerEditFormStore.validate();

    setIsEditMode(false);

    if (answerEditFormStore.isValidateSuccessful) {
      answerStore.modify({
        answerId: answer.id,
        body: answerEditFormStore.fields.body,
      });

      answerEditFormStore.reset();
    }
  };

  useEffect(() => {
    answerEditFormStore.fillFields(answer);
  }, [answer, isEditMode]);

  if (isEditMode) {
    return (
      <Container>
        <h2>답변 수정하기</h2>
        <form onSubmit={handleSubmit}>
          <Textarea
            name="input-answer-edit"
            value={answerEditFormStore.fields.body || ''}
            onChange={(e) => answerEditFormStore.changeBody(e.target.value)}
          />
          <ButtonWrapper>
            <Button type="submit">
              완료
            </Button>
          </ButtonWrapper>
        </form>
      </Container>
    );
  }

  return (
    <Container>
      <p>
        {answer.body}
      </p>
      <Footer>
        <div>
          <p>{answer.createdAt.split('T')[0]}</p>
          <p>
            조회수
            {' '}
            {answer.hits}
          </p>
          <p>
            추천수
            {' '}
            {answer.likeUserIds.length}
          </p>
          <Link to={`/users/${answer.author.id}`}>{answer.author.displayName}</Link>
        </div>
        <div>
          <Likes
            selected={answer.likeUserIds.map((i) => i.id).includes(userStore.user?.id)}
            onClick={handleClickLike}
          />
          {
            answer.author.id === userStore.user?.id
        && questionStore.question.status === 'open'
              ? (
                <Wrapper>
                  <button type="button" onClick={handleClickEdit}>
                    수정
                  </button>
                </Wrapper>
              ) : (
                null
              )
          }
          {adoptable
            ? (
              <Wrapper>
                <button type="button" onClick={() => handleClickSelect({ answerId: answer.id })}>
                  채택
                </button>
              </Wrapper>
            ) : null}
          {!adoptable && selected
            ? (
              <div>
                v
              </div>
            ) : null}
        </div>
      </Footer>
    </Container>
  );
}
