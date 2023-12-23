import React, { createContext, useContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [clickedCard, setClickedCard] = useState(null);
  const [modalImgUrl, setModalImgUrl] = useState(null);
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [featureData, setFeatureData] = useState({
    title: '',
    description: '',
    url: '',
    readmeurl: '',
    images: [],
    startDate: '',
    endDate: '',
    technologies: [],
  });
  const [allFeatureData, setAllFeatureData] = useState([
    {
      title: 'Deck Builder',
      description:
        // eslint-disable-next-line max-len
        'A deck building application that allows users to search for cards and add them to their deck. Users can also create an account, save their decks, and view other users decks.',
      url: 'https://github.com/reedoooo/enhanced-card-store',
      readmeurl: 'deck-builder-frontend/README.md',
      images: [
        'public/images/pages/deckBuilder.png',

        // eslint-disable-next-line max-len
        // 'https://github.com/reedoooo/enhanced-card-store/blob/6af330ab4f553bb3279dfa8ed7d30bce098e770f/public/images/pages/deckBuilder.png',
      ],
      startDate: 'August 2021',
      endDate: 'September 2021',
      technologies: ['React', 'Node', 'Express', 'PostgreSQL'],
    },
    {
      title: 'Collection Tracker',
      description:
        // eslint-disable-next-line max-len
        'A collection tracker application that allows users to search for cards and add them to their collection. Users can also create an account, save their collection, and view other users collections.',
      url: 'https://github.com/reedoooo/enhanced-card-store',
      readmeurl: 'collection-tracker-frontend/README.md',
      images: [
        'public/images/pages/portfolio.png',
        // eslint-disable-next-line max-len
        // 'https://github.com/reedoooo/enhanced-card-store/blob/6af330ab4f553bb3279dfa8ed7d30bce098e770f/public/images/pages/portfolio.png',
      ],
      startDate: 'August 2021',
      endDate: 'September 2021',
      technologies: ['React', 'Node', 'Express', 'PostgreSQL'],
    },
    {
      title: 'Store',
      description:
        // eslint-disable-next-line max-len
        'A store application that allows users to search for cards and add them to their cart. Users can also create an account, save their cart, and view other users carts.',
      url: 'https://github.com/reedoooo/enhanced-card-store',
      readmeurl: 'store-frontend/README.md',
      images: [
        'public/images/pages/cart.png',
        // eslint-disable-next-line max-len
        // 'https://github.com/reedoooo/enhanced-card-store/blob/6af330ab4f553bb3279dfa8ed7d30bce098e770f/public/images/pages/cart.png',
        // eslint-disable-next-line max-len
        // '../assets/images/pages/cart.png',
      ],
      startDate: 'August 2021',
      endDate: 'September 2021',
      technologies: ['React', 'Node', 'Express', 'PostgreSQL'],
    },
  ]);
  const openModalWithCard = (card) => {
    setModalContent(card);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalContent(null);
    setModalOpen(false);
  };

  const showDetailsModal = (project) => {
    setFeatureData(project);
    setDetailsModalShow(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalShow(false);
  };

  return (
    <ModalContext.Provider
      value={{
        modalContent,
        isModalOpen,
        clickedCard,
        modalImgUrl,
        detailsModalShow,
        featureData,
        allFeatureData,
        setModalContent,
        setFeatureData,
        setAllFeatureData,
        showDetailsModal,
        closeDetailsModal,
        setDetailsModalShow,
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
