import React, { createContext, useContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [clickedCard, setClickedCard] = useState(null);
  const [modalImgUrl, setModalImgUrl] = useState(null);

  const openModalWithCard = (card) => {
    setModalContent(card);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        modalContent,
        isModalOpen,
        clickedCard,
        modalImgUrl,
        setModalImgUrl,
        setClickedCard,
        openModalWithCard,
        closeModal,
        setModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};
