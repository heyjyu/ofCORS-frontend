import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import useSearchStore from '../hooks/useSearchStore';
import AskLink from './AskLink';
import SolutionItem from './SolutionItem';

const Title = styled.h1`
  font-size: 1.5em;
  margin: 1em;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1em;
  border-bottom: 1px solid black;
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
      <Wrapper>
        <Title>
          검색 결과
        </Title>
        <AskLink />
      </Wrapper>
      {searchStore.results.length
        ? (
          searchStore.results
            .map((result) => (
              <SolutionItem key={result.id} solution={result} />
            ))
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
