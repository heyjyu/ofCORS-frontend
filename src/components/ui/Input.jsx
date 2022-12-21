import styled from 'styled-components';

const Container = styled.div`
  font-size: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  width: 100%;
  height: 7em;
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
  border: ${(props) => (`1px solid${props.error ? '#FF424D' : '#D8D8D8'}`)};
  color: #666666;

  :focus {
    font-size: 1em;
    border: ${(props) => (`1px solid${props.error ? '#FF424D' : '#22DAAB'}`)};
    outline: none;
    color: #666666;
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

export default function Input({
  name, label, type, value, maxLength = '', handleChange, message, errorMessage, required = false,
}) {
  return (
    <Container>
      <Label htmlFor={`input-${name}`}>
        {label}
        {required
          ? (
            <Required>
              *
            </Required>
          )
          : null}
      </Label>
      <StyledInput
        type={type}
        name={name}
        id={`input-${name}`}
        value={value}
        error={errorMessage}
        maxLength={maxLength}
        onChange={handleChange}
      />
      {errorMessage
        ? <Error>{errorMessage}</Error>
        : <Message>{message}</Message>}
    </Container>
  );
}
