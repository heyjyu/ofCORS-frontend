import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useUserStore from '../hooks/useUserStore';
import Tags from './Tags';
import Header from './ui/Header';
import Title from './ui/Title';

const StyledHeader = styled(Header)`
  flex-direction: column;
  align-items: flex-start;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5em;
  margin-right: 1em;
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1em;
  margin: 1em;

  @media (max-width: 1264px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const Input = styled.input`
  width: 15em;
  margin-top: 2em;
  padding: 0.5em 0.75em;
  border: 1px solid #EAEAEC;

  :focus {
    outline: none;
  }
`;

export default function Users() {
  const userStore = useUserStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    userStore.fetchUsers({ sort: 'like', keyword: userStore.keyword });
  };

  if (userStore.isUsersLoading) {
    return (
      <p>
        Loading...
      </p>
    );
  }

  return (
    <div>
      <StyledHeader>
        <Title>
          사람들
        </Title>
        <Wrapper>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Input name="search-users" type="text" placeholder="검색" onChange={(e) => userStore.changeKeyword(e.target.value)} />
          </form>
        </Wrapper>
      </StyledHeader>
      <List>
        {userStore.users.length
          ? userStore.users
            .map((user) => (
              <li key={user.id}>
                <Wrapper>
                  <Link to={`/users/${user.id}`}>
                    <img alt="avatar" src={user.imageUrl} />
                  </Link>
                  <div>
                    <Link to={`/users/${user.id}`}>
                      {user.displayName}
                    </Link>
                    <p>
                      {user.countOfLikes}
                      추천
                    </p>
                    <Tags tags={user.tags} />
                  </div>
                </Wrapper>
              </li>
            ))
          : null}
        {userStore.users.length === 0 && userStore.searching
          ? (
            <p>검색결과가 없습니다</p>
          ) : null}
      </List>
    </div>
  );
}
