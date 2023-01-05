import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 3em;
`;

const LikeButton = styled.button`
  border: none;
  background: ${(props) => (props.selected
    ? 'url(/assets/images/iconmonstr-heart-filled-32.png) no-repeat center center/contain'
    : 'url(/assets/images/iconmonstr-heart-lined-32.png) no-repeat center center/contain')};
  text-indent: -1000em;
  cursor: pointer;
`;

export default function Likes({ count, selected, onClick }) {
  return (
    <Wrapper>
      <p>{count}</p>
      <LikeButton type="button" selected={selected} name="like" onClick={onClick}>
        like
      </LikeButton>
    </Wrapper>
  );
}
