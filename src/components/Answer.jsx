import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useAnswerEditFormStore from '../hooks/useAnswerEditFormStore';
import useAnswerStore from '../hooks/useAnswerStore';
import useQuestionStore from '../hooks/useQuestionStore';
import useSelectAnswerFormStore from '../hooks/useSelectAnswerFormStore';
import useUserStore from '../hooks/useUserStore';
import Likes from './Likes';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
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

  return (
    <>
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
      <Container>
        <div>
          <Likes
            count={answer.likeUserIds.length}
            selected={answer.likeUserIds.map((i) => i.id).includes(userStore.user?.id)}
            onClick={handleClickLike}
          />
          {adoptable
            ? (
              <button type="button" onClick={() => handleClickSelect({ answerId: answer.id })}>
                채택
              </button>
            ) : null}
          {!adoptable && selected
            ? (
              <div>
                v
              </div>
            ) : null}
        </div>
        {isEditMode
          ? (
            <form onSubmit={handleSubmit}>
              <textarea
                name="input-answer-edit"
                value={answerEditFormStore.fields.body || ''}
                onChange={(e) => answerEditFormStore.changeBody(e.target.value)}
              />
              <button type="submit">
                완료
              </button>
            </form>
          ) : (
            <p>
              {answer.body}
            </p>
          )}
      </Container>
    </>
  );
}
