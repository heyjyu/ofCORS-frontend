import styled from 'styled-components';
import useSolutionStore from '../hooks/useSolutionStore';
import AskLink from './AskLink';
import SolutionItem from './SolutionItem';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  border-bottom: 1px solid black;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-inline: 1em;
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin: 1em;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1em;
  margin: 0 1em 1em;
`;

export default function Solutions() {
  const solutionStore = useSolutionStore();

  const handleClickLatest = () => {
    solutionStore.fetchSolutions({ sort: 'createdAt' });
  };

  const handleClickLike = () => {
    solutionStore.fetchSolutions({ sort: 'like' });
  };

  if (solutionStore.isSolutionsLoading) {
    return (
      <p>
        Loading...
      </p>
    );
  }

  return (
    <div>
      <Header>
        <Wrapper>
          <Title>
            해결된 질문
          </Title>
          <AskLink />
        </Wrapper>
        <Wrapper>
          <Buttons>
            <button type="button" onClick={handleClickLatest}>
              최신순
            </button>
            <button type="button" onClick={handleClickLike}>
              추천순
            </button>
          </Buttons>
        </Wrapper>
      </Header>
      {solutionStore.solutions.length
        ? (
          solutionStore.solutions
            .map((solution) => (
              <SolutionItem key={solution.id} solution={solution} />
            ))
        ) : (
          <p>해결된 질문이 아직 없습니다!</p>
        )}
    </div>
  );
}
