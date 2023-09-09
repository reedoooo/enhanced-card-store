import React from 'react';
import DeckCardModal from '../modals/DeckCardModal';

const DeckCardDialog = ({ isOpen, onClose, card, cardInfo }) => {
  return (
    <DeckCardModal
      isOpen={isOpen}
      onClose={onClose}
      card={card}
      cardInfo={cardInfo}
    />
  );
};

export default DeckCardDialog;
