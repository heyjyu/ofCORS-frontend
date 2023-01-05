import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useAnswerStore from '../hooks/useAnswerStore';
import useSelectAnswerFormStore from '../hooks/useSelectAnswerFormStore';
import useUserStore from '../hooks/useUserStore';
import Likes from './Likes';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

export default function Answer({ answer, adoptable, selected }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const answerStore = useAnswerStore();
  const selectAnswerFormStore = useSelectAnswerFormStore();
  const userStore = useUserStore();
  const [accessToken] = useLocalStorage('accessToken', '');

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

  return (
    <Wrapper key={answer.id}>
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
      <p>
        {answer.body}
      </p>
    </Wrapper>
  );
}
