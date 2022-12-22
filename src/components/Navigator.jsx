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
  padding-block: 2em;
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
          <Link to="/solved-questions">
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
