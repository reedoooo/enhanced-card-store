import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

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
        openModalWithCard,
        closeModal,
        modalContent,
        isModalOpen,
        setModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
