import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useQuestionFormStore from '../hooks/useQuestionFormStore';
import useQuestionStore from '../hooks/useQuestionStore';
import Header from './ui/Header';
import Input from './ui/Input';
import Title from './ui/Title';

const Container = styled.div`
  width: 30em;
`;

export default function QuestionForm() {
  const navigate = useNavigate();

  const questionFormStore = useQuestionFormStore();
  const questionStore = useQuestionStore();

  const { title, body, points } = questionFormStore.fields;
  const { tags } = questionFormStore;

  const [confirmButtonOpened, setConfirmButtonOpened] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await questionFormStore.validate();

    if (questionFormStore.isValidateSuccessful) {
      await questionStore.create({
        title, body, tags, points,
      });

      navigate('/questions');
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
    questionFormStore.fetchPoints();
  }, []);

  return (
    <Container>
      <Header>
        <Title>질문하기</Title>
      </Header>
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
        <Input
          name="points"
          label="포인트"
          type="number"
          value={questionFormStore.fields.points || ''}
          onChange={(e) => questionFormStore.changePoints(e.target.value)}
          errorMessage={questionFormStore.errors.points}
        />
        <div>
          보유 포인트:
          {' '}
          {questionFormStore.points}
        </div>
        <button type="button" onClick={handleClickOpenConfirmButton}>
          올리기
        </button>
        {confirmButtonOpened
          ? (
            <>
              <div>
                질문을 올리면
                {' '}
                {points || 0}
                포인트가 차감되고, 차감된 포인트를 돌려받으실 수 없습니다. 질문을 올리시겠습니까?
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
