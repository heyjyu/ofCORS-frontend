import styled from 'styled-components';
import useSolutionStore from '../hooks/useSolutionStore';
import AskLink from './AskLink';
import SolutionItem from './SolutionItem';
import Header from './ui/Header';
import Title from './ui/Title';

const StyledHeader = styled(Header)`
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-inline: 1em;

  div {
    display: flex;
    gap: 1em;
  }
`;

const Select = styled.select`
  padding: 0.5em 2.5em 0.5em 0.75em;
  border: 1px solid #EAEAEC;
  border-radius: 0.5em;
  background: url(/assets/images/triangle.svg) no-repeat center right 0.75em;
  background-color: white;
  color: #838383;
  -moz-appearance:none; /* Firefox */
  -webkit-appearance:none; /* Safari and Chrome */
  appearance:none;

  :focus {
    outline: none;
  }
`;

const Message = styled.p`
  font-weight: 700;
  padding: 1.25em;
  border: 1px solid #EAEAEC;
  background: white;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 1.25em;
  border: 1px solid #EAEAEC;
  background: white;
`;

export default function Solutions() {
  const solutionStore = useSolutionStore();

  if (solutionStore.isSolutionsLoading) {
    return (
      <p />
    );
  }

  return (
    <div>
      <StyledHeader>
        <Wrapper>
          <Title>
            해결된 질문
          </Title>
          <div>
            <Select
              name="sort"
              value={solutionStore.sort}
              onChange={(e) => solutionStore.fetchSolutions({ sort: e.target.value })}
            >
              <option value="createdAt">
                최신순
              </option>
              <option value="like">
                추천순
              </option>
            </Select>
            <AskLink />
          </div>
        </Wrapper>
      </StyledHeader>
      {solutionStore.solutions.length
        ? (
          <List>
            {solutionStore.solutions
              .map((solution) => (
                <SolutionItem key={solution.id} solution={solution} />
              ))}
          </List>
        ) : (
          <Message>해결된 질문이 아직 없습니다!</Message>
        )}
    </div>
  );
}
