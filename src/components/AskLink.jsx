import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  font-size: 0.9em;
  display: flex;
  align-items: center;
  padding: 0.5em 1em 0.3em;
  border-radius: 0.5em;
  background-color: #E2D9FF;
  color: #6C40FF;
`;

export default function AskLink() {
  return (
    <StyledLink to="/ask">
      질문하기
    </StyledLink>
  );
}
