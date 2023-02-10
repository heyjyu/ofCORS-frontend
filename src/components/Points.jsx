import styled from 'styled-components';
import usePointStore from '../hooks/usePointStore';
import Header from './ui/Header';
import Title from './ui/Title';

const List = styled.ul`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1em;
  margin: 1em;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 15em;
  height: 10em;
  border: 1px solid black;
`;

export default function Points() {
  const pointStore = usePointStore();

  const points = [10, 30, 50, 100, 300, 500, 1000, 3000, 5000];

  const handleClickCharge = async (point) => {
    const redirectUrl = await pointStore.charge(point);
    window.location.href = redirectUrl;
  };

  return (
    <div>
      <Header>
        <Title>
          포인트 구매
        </Title>
      </Header>
      <List>
        {points.map((point) => (
          <Item key={point}>
            <div>
              {point}
              pt
            </div>
            <div>
              <span>
                {(point * 110).toLocaleString()}
                원
              </span>
              <button type="button" onClick={() => handleClickCharge(point)}>구매</button>
            </div>
          </Item>
        ))}
      </List>
    </div>
  );
}
