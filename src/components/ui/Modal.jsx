import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

const Dialog = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 15em;
  width: 23em;
  padding: 2em;
  border-radius: 3px;
  background-color: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  p {
    font-size: .9em;
  }

  div {
    font-size: 1.15em;
    display: flex;
    text-align: center;
  }
`;

const Button = styled.button`
  font-weight: 700;
  margin-top: 2.5em;
  padding: 0.5em 3em;
  border: 1px solid #AB92FF;
  border-radius: 0.25em;
  background: #BAA5FF;
  color: white;
`;

export default function Modal({
  buttonName, content, onClose, disabled,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const handleBackgroundClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleBackgroundClick);
    }

    if (!isOpen) {
      document.removeEventListener('mousedown', handleBackgroundClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleBackgroundClick);
    };
  }, [isOpen]);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} disabled={disabled}>{buttonName}</button>
      {isOpen && (
        <Container>
          <Dialog ref={modalRef}>
            <div>
              {content}
            </div>
            <Button type="button" onClick={handleClose}>예</Button>
          </Dialog>
        </Container>
      )}
    </>
  );
}
