import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Navigator from '../components/Navigator';
import SearchResults from '../components/SearchResults';
import useSearchStore from '../hooks/useSearchStore';

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

const LeftSideBar = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  flex: 1;
`;

export default function SearchPage() {
  const searchStore = useSearchStore();

  const [searchParams] = useSearchParams();

  const keyword = searchParams.get('q');

  useEffect(() => {
    searchStore.fetchResults({ keyword });
  }, [keyword]);

  return (
    <Container>
      <LeftSideBar>
        <Navigator />
      </LeftSideBar>
      <Wrapper>
        <SearchResults />
      </Wrapper>
    </Container>
  );
}
