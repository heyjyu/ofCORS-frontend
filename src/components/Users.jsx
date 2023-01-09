import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useUserStore from '../hooks/useUserStore';
import Tags from './Tags';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  border-bottom: 1px solid black;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5em;
  margin-inline: 1em;
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin: 1em;
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
      <Header>
        <Title>
          사람들
        </Title>
        <Wrapper>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <input name="search-users" type="text" placeholder="사람 검색" onChange={(e) => userStore.changeKeyword(e.target.value)} />
          </form>
        </Wrapper>
      </Header>
      <List>
        {userStore.users.length
          ? userStore.users
            .map((user) => (
              <li key={user.id}>
                <Wrapper>
                  <img alt="avatar" src={user.imageUrl} />
                  <div>
                    <Link to={`users/${user.id}`}>
                      {user.displayName}
                    </Link>
                    <p>
                      {user.countOfLikes}
                      추천
                    </p>
                    <ul>
                      <Tags tags={user.tags} />
                    </ul>
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
