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

const StyledTextarea = styled.textarea`
  font-family: Arial, sans-serif;
  font-size: 1em;
  font-weight: 400;
  height: 18em;
  padding: 1em;
  border: 1px solid #EAEAEC;
  resize: none;

  :focus {
    font-size: 1em;
    border: 1px solid #6C40FF;
    outline: none;
  }
`;

const Label = styled.label`
  font-weight: 700;
  display: block;
  color: inherit;
`;

const Required = styled.span`
  color: #FF424D;
`;

const Message = styled.p`
  color: inherit;
`;

const Error = styled.p`
  color: #FF424D;
`;

export default function Textarea({
  name, label, type, value, maxLength = '', placeholder, onChange, message, errorMessage, required = false,
}) {
  return (
    <Container>
      <Label htmlFor={`textarea-${name}`}>
        {label}
        {required
          ? (
            <Required>
              *
            </Required>
          )
          : null}
      </Label>
      <StyledTextarea
        type={type}
        name={name}
        id={`textarea-${name}`}
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
