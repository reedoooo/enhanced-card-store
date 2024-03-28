import React from 'react';
import ReusableIconButton from './ReusableIconButton';
import deckIcon from '../../../assets/icons/deckIcon2.png';

const DeckOfCardsIcon = (color) => {
  return (
    <ReusableIconButton
      icon={deckIcon}
      altText="deck icon"
      onClick={() => console.log('Deck icon clicked')}
      color={color || 'rgba(0, 0, 0, 0.54)'}
      backgroundColor={color || 'rgba(0, 0, 0, 0.54)'}
      // color={'rgba(0, 0, 0, 0.54)'}
      // size={48}
      // width={40}
      // height={40}
      // hoverColor="rgba(0, 0, 0, 0.1)"
      // background-color={'#333'}
    />
  );
};

export default DeckOfCardsIcon;
