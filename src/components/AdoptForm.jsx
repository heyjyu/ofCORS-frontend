import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useAnswerStore from '../hooks/useAnswerStore';
import useQuestionStore from '../hooks/useQuestionStore';
import useSelectAnswerFormStore from '../hooks/useSelectAnswerFormStore';
import Input from './ui/Input';

const Container = styled.div`
  width: 30em;
`;

export default function AdoptForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const selectAnswerFormStore = useSelectAnswerFormStore();
  const questionStore = useQuestionStore();
  const answerStore = useAnswerStore();

  const { message, points } = selectAnswerFormStore.fields;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await selectAnswerFormStore.validate();

    if (selectAnswerFormStore.isValidateSuccessful) {
      await questionStore.adoptAnswer({
        questionId: id,
        answerId: selectAnswerFormStore.selectedAnswerId,
        points,
        message,
      });

      navigate(`/questions/${id}`);
    }
  };

  useEffect(() => {
    selectAnswerFormStore.fetchPoints();
  }, []);

  return (
    <Container>
      <h1>답변 채택하기</h1>
      <p>답변 작성자</p>
      <img alt="avatar" src={answerStore.answer?.author.imageUrl} />
      <p>{answerStore.answer?.author.displayName}</p>
      <form onSubmit={handleSubmit}>
        <Input
          name="message"
          label="감사 메시지"
          type="text"
          value={selectAnswerFormStore.fields.message || ''}
          onChange={(e) => selectAnswerFormStore.changeMessage(e.target.value)}
        />
        <Input
          name="bonus-point"
          label={`추가 포인트 (보유 포인트: ${selectAnswerFormStore.points})`}
          type="number"
          value={selectAnswerFormStore.fields.points || ''}
          onChange={(e) => selectAnswerFormStore.changePoints(e.target.value)}
          errorMessage={selectAnswerFormStore.errors.points}
        />
        <button type="submit">
          보내기
        </button>
      </form>
    </Container>
  );
}
