import styled from 'styled-components';

const LikeButton = styled.button`
  width: 2em;
  margin-top: 0.5em;
  border: none;
  background: ${(props) => (props.selected
    ? 'url(/assets/images/heart-filled.svg) no-repeat center center/contain'
    : 'url(/assets/images/heart-lined.svg) no-repeat center center/contain')};
  text-indent: -1000em;
  cursor: pointer;
`;

export default function Likes({ selected, onClick }) {
  return (
    <LikeButton type="button" selected={selected} name="like" onClick={onClick}>
      like
    </LikeButton>
  );
}
