import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.nav`
  position: sticky;
  top: 3em;
  width: 10em;
  height: calc(100vh - 3em);
  border-right: 1px solid black;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 2em 1em;
`;

export default function Navigator() {
  return (
    <Container>
      <List>
        <li>
          <Link to="/">
            홈
          </Link>
        </li>
        <li>
          <Link to="/questions">
            질문
          </Link>
        </li>
        <li>
          <Link to="/solutions">
            해결완료
          </Link>
        </li>
        <li>
          <Link to="/users">
            사람들
          </Link>
        </li>
      </List>
    </Container>
  );
}
