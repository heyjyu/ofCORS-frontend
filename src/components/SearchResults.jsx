import { useSearchParams } from 'react-router-dom';
import useSearchStore from '../hooks/useSearchStore';
import AskLink from './AskLink';
import SolutionItem from './SolutionItem';
import Header from './ui/Header';
import Title from './ui/Title';

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
