import React from 'react';
import DeckCardModal from '../modals/DeckCardModal';
import GenericCardModal from '../modals/GenericCardModal';

const DeckCardDialog = ({ isOpen, onClose, card, cardInfo }) => {
  return (
    <GenericCardModal
      isOpen={isOpen}
      onClose={onClose}
      card={card}
      cardInfo={cardInfo}
    />
  );
};

export default DeckCardDialog;
