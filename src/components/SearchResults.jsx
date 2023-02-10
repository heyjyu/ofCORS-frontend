import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useSearchStore from '../hooks/useSearchStore';
import AskLink from './AskLink';
import SolutionItem from './SolutionItem';
import Header from './ui/Header';
import Title from './ui/Title';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 1.25em;
  border: 1px solid #EAEAEC;
  background: white;
`;

export default function SearchResults() {
  const searchStore = useSearchStore();
  const [searchParams] = useSearchParams();

  if (searchStore.isResultsLoading) {
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
          검색 결과
        </Title>
        <AskLink />
      </Header>
      {searchStore.results.length
        ? (
          <List>
            {searchStore.results
              .map((result) => (
                <SolutionItem key={result.id} solution={result} />
              ))}
          </List>
        ) : (
          <p>
            채택된 질문 중 &apos;
            {searchParams.get('q')}
            &apos;에 대한 검색 결과를 찾지 못했습니다
          </p>
        )}
    </div>
  );
}
