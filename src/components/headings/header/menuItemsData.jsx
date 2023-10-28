import React from 'react';
import {
  Home as HomeIcon,
  Store as StoreIcon,
  ShoppingCart as CartIcon,
  Assessment as AssessmentIcon,
  Deck as DeckOfCardsIcon,
} from '@mui/icons-material';

export const getMenuItemsData = (isloggedin) => {
  // Error handling: Check if 'isloggedin' is a boolean
  if (typeof isloggedin !== 'boolean') {
    console.error("Invalid argument: 'isloggedin' should be a boolean");
    return [];
  }

  try {
    const baseMenuItems = [
      { name: 'Home', icon: <HomeIcon />, to: '/home', requiresLogin: false },
      {
        name: 'Store',
        icon: <StoreIcon />,
        to: '/store',
        requiresLogin: !isloggedin,
      },
      {
        name: 'Deck Builder',
        icon: <DeckOfCardsIcon />,
        to: '/deckbuilder',
        requiresLogin: false,
      },
      {
        name: 'Cart',
        icon: <CartIcon />,
        to: '/cart',
        requiresLogin: !isloggedin,
      },
      {
        name: 'Collection',
        icon: <AssessmentIcon />,
        to: '/collection',
        requiresLogin: !isloggedin,
      },
    ];

    // If the user is logged in, set all requiresLogin fields to false
    if (isloggedin) {
      console.log('isloggedin is true', isloggedin);
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
