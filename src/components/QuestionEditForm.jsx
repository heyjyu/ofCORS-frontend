import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useQuestionFormStore from '../hooks/useQuestionFormStore';
import useQuestionStore from '../hooks/useQuestionStore';
import Header from './ui/Header';
import Input from './ui/Input';
import Modal from './ui/Modal';
import Title from './ui/Title';

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

  const handleClickSubmit = async () => {
    await questionStore.modify({
      title, body, tags,
    });

    navigate(`/questions/${id}`);
  };

  const handleClickTag = () => {
    questionFormStore.addTag(questionFormStore.fields.tag);
    questionFormStore.changeTag('');
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
      <Header>
        <Title>질문 수정하기</Title>
      </Header>
      <form>
        <Input
          name="title"
          placeholder="제목을 입력하세요"
          type="text"
          value={questionFormStore.fields.title || ''}
          onChange={(e) => questionFormStore.changeTitle(e.target.value)}
          errorMessage={questionFormStore.errors.title}
        />
        <Input
          name="body"
          placeholder="문의하실 내용을 입력하세요"
          type="text"
          value={questionFormStore.fields.body || ''}
          onChange={(e) => questionFormStore.changeBody(e.target.value)}
          errorMessage={questionFormStore.errors.body}
        />
        <div>
          <label htmlFor="tag">
            태그
          </label>
          <div>
            <input
              name="tag"
              id="tag"
              type="text"
              value={questionFormStore.fields.tag || ''}
              onChange={(e) => questionFormStore.changeTag(e.target.value)}
            />
            <button type="button" onClick={handleClickTag}>
              추가
            </button>
          </div>
          {[...tags].map((tag) => (
            <div key={tag}>
              {tag}
              <button type="button" onClick={() => questionFormStore.removeTag(tag)}>
                x
              </button>
            </div>
          ))}
        </div>
        <Modal
          buttonName="수정"
          content="질문을 수정하시겠습니까?"
          onClose={handleClickSubmit}
          disabled={!questionFormStore.isValidateSuccessful}
        />
      </form>
    </Container>
  );
}
