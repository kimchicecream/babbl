import { useRef, useState, useContext, createContext } from 'react';
import ReactDOM from 'react-dom';
import './FullScreenModal.css';

const FullScreenModalContext = createContext();

export function FullScreenModalProvider({ children }) {
  const modalRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = () => {
    setModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onModalClose === 'function') {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue = {
    modalRef, // reference to modal div
    modalContent, // React component to render inside modal
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function called when modal is closing
    closeModal // function to close the modal
  };

  return (
    <>
      <FullScreenModalContext.Provider value={contextValue}>
        {children}
      </FullScreenModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function FullScreenModal() {
  const { modalRef, modalContent, closeModal } = useContext(FullScreenModalContext);
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!modalRef || !modalRef.current || !modalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id="fsmodal">
      <div id="fsmodal-background" onClick={closeModal} />
      <div id="fsmodal-content">
        {modalContent}
      </div>
    </div>,
    modalRef.current
  );
}

export const useFSModal = () => useContext(FullScreenModalContext);
