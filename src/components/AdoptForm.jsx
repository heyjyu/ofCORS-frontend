import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import useAnswerStore from '../hooks/useAnswerStore';
import useQuestionStore from '../hooks/useQuestionStore';
import useSelectAnswerFormStore from '../hooks/useSelectAnswerFormStore';
import Header from './ui/Header';
import Textarea from './ui/Textarea';
import Title from './ui/Title';

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  margin-block: 1em;
  padding: 2em;
  border: 1px solid #EAEAEC;
  background-color: white;
  color: #8E8E8E;

  p:first-child, label {
    font-weight: 700;
    margin-right: 1.5em;
    color: black;
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
    align-items: center;
  }
`;

const Image = styled.img`
  margin-right: 1em;
  border-radius: 50%;
`;

const Error = styled.p`
  font-size: 0.9em;
  padding-top: 1em;
  color: #FF424D;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  font-weight: 700;
  width: 10em;
  height: 4em;
  padding: 0.5em 3em;
  border: 1px solid #AB92FF;
  border-radius: 0.25em;
  background: #BAA5FF;
  color: white;
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
      <Header>
        <Title>답변 채택하기</Title>
      </Header>
      <Wrapper>
        <div>
          <p>답변 작성자</p>
          <Image alt="avatar" src={answerStore.answer?.author.imageUrl} />
          <p>{answerStore.answer?.author.displayName}</p>
        </div>
      </Wrapper>
      <form onSubmit={handleSubmit}>
        <Textarea
          name="message"
          type="text"
          placeholder="감사 메시지"
          value={selectAnswerFormStore.fields.message || ''}
          onChange={(e) => selectAnswerFormStore.changeMessage(e.target.value)}
        />
        <Wrapper>
          <div>
            <label htmlFor="input-bonus-point">
              추가 포인트
            </label>
            <input
              name="bonus-point"
              id="input-bonus-point"
              type="number"
              value={selectAnswerFormStore.fields.points || ''}
              onChange={(e) => selectAnswerFormStore.changePoints(e.target.value)}
            />
            <span>
              보유 포인트:
              {' '}
              {selectAnswerFormStore.points}
            </span>
          </div>
          {selectAnswerFormStore.errors.points
            ? <Error>{selectAnswerFormStore.errors.points}</Error>
            : null}
        </Wrapper>
        <ButtonWrapper>
          <Button type="submit">
            보내기
          </Button>
        </ButtonWrapper>
      </form>
    </Container>
  );
}
