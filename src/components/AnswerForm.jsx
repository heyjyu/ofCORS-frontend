import styled from 'styled-components';
import useAnswerFormStore from '../hooks/useAnswerFormStore';
import Textarea from './ui/Textarea';

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

export default function AnswerForm({ onSubmit }) {
  const answerFormStore = useAnswerFormStore();

  return (
    <>
      <h2>답변하기</h2>
      <form onSubmit={onSubmit}>
        <Textarea
          name="input-answer"
          value={answerFormStore.fields.body || ''}
          placeholder="답변을 입력하세요"
          onChange={(e) => answerFormStore.changeBody(e.target.value)}
        />
        <ButtonWrapper>
          <Button type="submit">
            등록
          </Button>
        </ButtonWrapper>
      </form>
    </>
  );
}
