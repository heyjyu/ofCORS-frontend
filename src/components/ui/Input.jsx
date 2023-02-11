import styled from 'styled-components';

const Container = styled.div`
  font-size: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  width: 100%;
  margin-bottom: 1.5em;
  color: #A0A0A0;

  p {
    font-size: 0.95em;
  }
`;

const StyledInput = styled.input`
  font-size: 1em;
  font-weight: 400;
  height: 3.75em;
  padding: 1em;
  border: 1px solid #EAEAEC;

  :focus {
    font-size: 1em;
    border: 1px solid #6C40FF;
    outline: none;
  }

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const Message = styled.p`
  color: inherit;
`;

const Error = styled.p`
  color: #FF424D;
`;

export default function Input({
  name, type, value, maxLength = '', placeholder, onChange, message, errorMessage,
}) {
  return (
    <Container>
      <StyledInput
        type={type}
        name={name}
        id={`input-${name}`}
        value={value}
        placeholder={placeholder}
        error={errorMessage}
        maxLength={maxLength}
        onChange={onChange}
      />
      {errorMessage
        ? <Error>{errorMessage}</Error>
        : <Message>{message}</Message>}
    </Container>
  );
}
