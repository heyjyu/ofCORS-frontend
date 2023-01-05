import useAnswerFormStore from '../hooks/useAnswerFormStore';

export default function AnswerForm({ onSubmit }) {
  const answerFormStore = useAnswerFormStore();

  return (
    <>
      <p>답변하기</p>
      <form onSubmit={onSubmit}>
        <textarea
          name="input-answer"
          value={answerFormStore.fields.body || ''}
          onChange={(e) => answerFormStore.changeBody(e.target.value)}
        />
        <button type="submit">
          등록
        </button>
      </form>
    </>
  );
}
