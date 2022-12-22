import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';

const Container = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 3em;
  border-bottom: 1px solid black;
  background-color: lightgray;
  z-index: 100;

  ul {
    display: flex;
    list-style: none;
  }
`;

export default function Header() {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const handleLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  return (
    <Container>
      <a href="/">
        ofCORS
      </a>
      <form action="/search" autoComplete="off">
        <input type="text" />
      </form>
      <ul>
        {accessToken
          ? (
            <>
              <li>
                <Link to="/mypage">
                  마이페이지
                </Link>
              </li>
              <li>
                <button type="button" onClick={handleLogout}>
                  로그아웃
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  로그인
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  회원가입
                </Link>
              </li>
              <li>
                <button type="button">
                  체험하기
                </button>
              </li>
            </>
          )}
      </ul>
    </Container>
  );
}
