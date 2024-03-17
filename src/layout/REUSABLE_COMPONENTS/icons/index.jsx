import React from 'react';
import IconButton from '@mui/material/IconButton'; // Import IconButton from Material-UI
import HomeIcon from '@mui/icons-material/Home';
import CollectionsIcon from '@mui/icons-material/Collections';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PersonIcon from '@mui/icons-material/Person';
import DeckBuilderIcon from './DeckBuilderIcon'; // Ensure this is correctly imported

export const rawIcons = {
  Home: <HomeIcon />,
  DeckBuilder: <DeckBuilderIcon />,
  CollectionPortfolio: <CollectionsIcon />,
  Store: <StoreIcon />,
  Cart: <ShoppingBasketIcon />,
  Profile: <PersonIcon />,
};

const iconsWithButton = (iconName) => {
  // Ensure that iconName exists in rawIcons to avoid undefined errors
  const IconComponent = rawIcons[iconName];
  if (!IconComponent) {
    console.error(`Icon ${iconName} not found.`);
    return null;
  }

  // Return the IconButton with the IconComponent
  return (
    <IconButton sx={{ flexGrow: 1, height: '100%', width: '100%' }}>
      {IconComponent}
    </IconButton>
  );
};

export const getContextIcon = (labelValue) => {
  switch (labelValue) {
    case 'Deck':
      return iconsWithButton('DeckBuilder');
    case 'Collection':
      return iconsWithButton('CollectionPortfolio');
    case 'Store':
      return iconsWithButton('Store');
    case 'Cart':
      return iconsWithButton('Cart');
    case 'Profile':
      return iconsWithButton('Profile');

    // Add more cases as needed for different contexts
    default:
      return null; // Or a default icon
  }
};

export default iconsWithButton;
