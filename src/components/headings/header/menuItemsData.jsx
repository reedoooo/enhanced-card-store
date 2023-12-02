import React from 'react';
import {
  Home as HomeIcon,
  Store as StoreIcon,
  ShoppingCart as CartIcon,
  Assessment as CollectionIcon,
  Person as ProfileIcon,
} from '@mui/icons-material';
// import DeckOfCardsIcon from '../../reusable/icons/DeckOfCardsIcon';
import DeckBuilderIcon from '../../reusable/icons/DeckBuilderIcon';
// import DeckOfCardsIcon from '../../../assets/deckIcon2.png';

export const getMenuItemsData = (isLoggedIn) => {
  // Error handling: Check if 'isLoggedIn' is a boolean
  if (typeof isLoggedIn !== 'boolean') {
    console.error("Invalid argument: 'isLoggedIn' should be a boolean");
    return [];
  }

  try {
    const baseMenuItems = [
      { name: 'Home', icon: <HomeIcon />, to: '/home', requiresLogin: false },
      {
        name: 'Store',
        icon: <StoreIcon />,
        to: '/store',
        requiresLogin: !isLoggedIn,
      },
      {
        name: 'Deck Builder',
        // icon: <DeckOfCardsIcon />,
        icon: <DeckBuilderIcon />,
        to: '/deckbuilder',
        requiresLogin: false,
      },
      {
        name: 'Cart',
        icon: <CartIcon />,
        to: '/cart',
        requiresLogin: !isLoggedIn,
      },
      {
        name: 'Collection',
        icon: <CollectionIcon />,
        to: '/collection',
        requiresLogin: !isLoggedIn,
      },
      {
        name: 'Profile',
        icon: <ProfileIcon />,
        to: '/profile',
        requiresLogin: isLoggedIn,
      },
    ];

    // If the user is logged in, set all requiresLogin fields to false
    if (isLoggedIn) {
      // console.log('isLoggedIn is true', isLoggedIn);
      return baseMenuItems.map((item) => ({
        ...item,
        requiresLogin: false,
      }));
    }

    return baseMenuItems;
  } catch (error) {
    console.error('An error occurred in getMenuItemsData:', error);
    return [];
  }
};

export default getMenuItemsData;
