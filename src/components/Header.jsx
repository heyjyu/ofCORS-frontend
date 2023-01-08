import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useSearchStore from '../hooks/useSearchStore';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
  position: fixed;
  top: 0;
  width: 100%;
  height: 3em;
  padding-inline: 1em;
  border-bottom: 1px solid black;
  background-color: lightgray;
  z-index: 100;

  form {
    flex: 1;
  }

  input {
    width: 100%;
    max-width: 50em;
  }

  ul {
    display: flex;
    align-items: center;
    gap: 1em;
    list-style: none;
  }
`;

export default function Header() {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const searchStore = useSearchStore();

  const handleLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchStore.keyword}`);
  };

  return (
    <Container>
      <a href="/">
        ofCORS
      </a>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input name="search" type="text" onChange={(e) => searchStore.changeKeyword(e.target.value)} />
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
                <button type="button">
                  알림
                </button>
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
