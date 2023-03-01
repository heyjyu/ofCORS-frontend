import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useQuestionFormStore from '../hooks/useQuestionFormStore';
import useQuestionStore from '../hooks/useQuestionStore';
import Header from './ui/Header';
import Input from './ui/Input';
import Modal from './ui/Modal';
import Textarea from './ui/Textarea';
import Title from './ui/Title';

const Wrapper = styled.div`
  margin-block: 1em;
  padding: 2em;
  border: 1px solid #EAEAEC;
  background-color: white;

  label {
    font-weight: 700;
    display: flex;
    align-items: center;
    width: 4em;
  }

  input {
    width: 17em;
    margin-right: 0.5em;
    padding: 0.5em 0.75em;
    border: 1px solid #EAEAEC;

    :focus {
      border: 1px solid #6C40FF;
      outline: none;
    }

    ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    }
  }

  div {
    display: flex;
  }

  span {
    font-size: 0.9em;
    display: flex;
    align-items: center;
    padding-left: 0.5em;
    color: #8E8E8E;
  }
`;

const Button = styled.button`
  padding-inline: 1em;
  border: none;
  background: #777677;
  color: white;
`;

const List = styled.ul`
  display: flex;
  gap: 0.5em;
  padding: 0.5em 0 0 4em;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  height: 2em;
  padding: 0.75em;
  border: 1px solid #E2D9FF;
  border-radius: 1em;
  background: #EBE4FF;

  div {
    padding-top: 0.25em;
    color: #6C40FF;
  }

  button {
    padding: 0 0 0 1em;
    border: none;
    background: transparent;
  }
`;

const Error = styled.p`
  font-size: 0.9em;
  padding-top: 1em;
  color: #FF424D;
`;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  >button {
    font-size: 1em;
    margin-bottom: 1em;
    padding: 1em 2em;
    border: 1px solid #AB92FF;
    border-radius: 0.25em;
    background: #BAA5FF;
    color: white;
  }
`;

export default function QuestionForm() {
  const navigate = useNavigate();

  const questionFormStore = useQuestionFormStore();
  const questionStore = useQuestionStore();

  const { title, body, points } = questionFormStore.fields;
  const { tags } = questionFormStore;

  const handleClickSubmit = async () => {
    await questionStore.create({
      title, body, tags, points,
    });

    navigate('/questions');
  };

  const handleClickTag = () => {
    questionFormStore.addTag(questionFormStore.fields.tag);
    questionFormStore.changeTag('');
  };

  useEffect(() => {
    questionFormStore.fetchPoints();
  }, []);

  return (
    <div>
      <Header>
        <Title>질문하기</Title>
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
        <Textarea
          name="body"
          placeholder="문의하실 내용을 입력하세요"
          type="text"
          value={questionFormStore.fields.body || ''}
          onChange={(e) => questionFormStore.changeBody(e.target.value)}
          errorMessage={questionFormStore.errors.body}
        />
        <Wrapper>
          <div>
            <label htmlFor="input-tag">
              태그
            </label>
            <input
              name="tag"
              id="input-tag"
              placeholder="#질문에 맞는 태그를 입력해주세요"
              type="text"
              value={questionFormStore.fields.tag || ''}
              onChange={(e) => questionFormStore.changeTag(e.target.value)}
            />
            <Button type="button" onClick={handleClickTag}>
              추가
            </Button>
          </div>
          <List>
            {[...tags].map((tag) => (
              <Item key={tag}>
                <div>
                  {tag}
                </div>
                <button type="button" onClick={() => questionFormStore.removeTag(tag)}>
                  X
                </button>
              </Item>
            ))}
          </List>
        </Wrapper>
        <Wrapper>
          <div>
            <label htmlFor="input-points">
              포인트
            </label>
            <input
              name="points"
              id="input-points"
              placeholder="직접 입력(숫자로만 입력하세요)"
              type="number"
              value={questionFormStore.fields.points || ''}
              onChange={(e) => questionFormStore.changePoints(e.target.value)}
            />
            <span>
              보유 포인트:
              {' '}
              {questionFormStore.points}
            </span>
          </div>
          {questionFormStore.errors.points
            ? <Error>{questionFormStore.errors.points}</Error>
            : null}
        </Wrapper>
        <ModalWrapper>
          <Modal
            buttonName="등록"
            content={`질문을 올리면
            ${' '}
            ${points || 0}
            포인트가 차감되고, 차감된 포인트를 돌려받으실 수 없습니다. 질문을 올리시겠습니까?`}
            onClose={handleClickSubmit}
            disabled={!questionFormStore.isValidateSuccessful}
          />
        </ModalWrapper>
      </form>
    </div>
  );
}
