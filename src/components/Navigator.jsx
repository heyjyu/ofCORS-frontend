import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.nav`
  position: sticky;
  top: 3.25em;
  width: 12em;
  height: calc(100vh - 3.25em);
  margin-right: 4em;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 2em 0;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 2em;
  padding-top: 0.1em;
  padding-left: 2em;
  border-radius: 0.3em;
  background-color: ${(props) => (props.selected ? 'white' : 'transparent')};
`;

export default function Navigator() {
  const location = useLocation();

  return (
    <Container>
      <List>
        <li>
          <StyledLink to="/" selected={location.pathname === '/'}>
            🏠홈
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/questions" selected={location.pathname.startsWith('/questions')}>
            ❓질문
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/solutions" selected={location.pathname.startsWith('/solutions')}>
            ✨해결완료
          </StyledLink>
        </li>
        <li>
          <StyledLink to="/users" selected={location.pathname.startsWith('/users')}>
            👥사람들
          </StyledLink>
        </li>
      </List>
    </Container>
  );
}
