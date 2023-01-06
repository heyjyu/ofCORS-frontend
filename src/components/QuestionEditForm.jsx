import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useQuestionFormStore from '../hooks/useQuestionFormStore';
import useQuestionStore from '../hooks/useQuestionStore';
import Input from './ui/Input';

const Container = styled.div`
  width: 30em;
`;

export default function QuestionEditForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const questionFormStore = useQuestionFormStore();
  const questionStore = useQuestionStore();

  const { title, body } = questionFormStore.fields;
  const { tags } = questionFormStore;

  const [confirmButtonOpened, setConfirmButtonOpened] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await questionFormStore.validate();

    if (questionFormStore.isValidateSuccessful) {
      await questionStore.modify({
        title, body, tags,
      });

      navigate(`/questions/${id}`);
    }
  };

  const handleClickTag = () => {
    questionFormStore.addTag(questionFormStore.fields.tag);
    questionFormStore.changeTag('');
  };

  const handleClickOpenConfirmButton = async () => {
    await questionFormStore.validate();

    if (questionFormStore.isValidateSuccessful) {
      setConfirmButtonOpened(true);
    }
  };

  useEffect(() => {
    if (questionStore.question) {
      questionFormStore.fillFields(questionStore.question);
    }
  }, [questionStore.question]);

  if (!questionStore.question) {
    return null;
  }

  return (
    <Container>
      <h1>질문 수정하기</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          label="질문 제목"
          type="text"
          value={questionFormStore.fields.title || ''}
          onChange={(e) => questionFormStore.changeTitle(e.target.value)}
          errorMessage={questionFormStore.errors.title}
        />
        <Input
          name="body"
          label="상황 설명"
          type="text"
          value={questionFormStore.fields.body || ''}
          onChange={(e) => questionFormStore.changeBody(e.target.value)}
          errorMessage={questionFormStore.errors.body}
        />
        <Input
          name="tag"
          label="태그"
          type="text"
          value={questionFormStore.fields.tag || ''}
          onChange={(e) => questionFormStore.changeTag(e.target.value)}
          errorMessage={questionFormStore.errors.tag}
        />
        <button type="button" onClick={handleClickTag}>
          추가
        </button>
        {[...tags].map((tag) => (
          <div key={tag}>
            {tag}
            <button type="button" onClick={() => questionFormStore.removeTag(tag)}>
              x
            </button>
          </div>
        ))}
        <div>
          <button type="button" onClick={handleClickOpenConfirmButton}>
            수정
          </button>
        </div>
        {confirmButtonOpened
          ? (
            <>
              <div>
                질문을 수정하시겠습니까?
              </div>
              <button type="submit">
                예
              </button>
            </>
          )
          : null}
      </form>
    </Container>
  );
}
