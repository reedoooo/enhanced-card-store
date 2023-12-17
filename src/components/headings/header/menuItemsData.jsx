import React from 'react';
import {
  Home as HomeIcon,
  Store as StoreIcon,
  ShoppingCart as CartIcon,
  Assessment as CollectionIcon,
  Person as ProfileIcon,
} from '@mui/icons-material';
import DeckBuilderIcon from '../../reusable/icons/DeckBuilderIcon';
import { Badge } from '@mui/material';
import { useCartStore } from '../../../context/CartContext/CartContext';
export const getMenuItemsData = (isLoggedIn) => {
  const { cartCardQuantity } = useCartStore();
  // Error handling: Check if 'isLoggedIn' is a boolean
  if (typeof isLoggedIn !== 'boolean') {
    console.error("Invalid argument: 'isLoggedIn' should be a boolean");
    return [];
  }

  try {
    const baseMenuItems = [
      { name: 'Home', icon: <HomeIcon />, to: '/home', requiresLogin: false },
      {
        name: 'Deck Builder',
        // icon: <DeckOfCardsIcon />,
        icon: <DeckBuilderIcon />,
        to: '/deckbuilder',
        requiresLogin: false,
      },
      {
        name: 'Collection',
        icon: <CollectionIcon />,
        to: '/collection',
        requiresLogin: !isLoggedIn,
      },
      {
        name: 'Store',
        icon: <StoreIcon />,
        to: '/store',
        requiresLogin: !isLoggedIn,
      },
      {
        name: 'Cart',
        icon: (
          <Badge
            badgeContent={cartCardQuantity}
            color="secondary"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',

              paddingRight: '1rem',
            }}
          >
            <CartIcon />
          </Badge>
        ),
        to: '/cart',
        requiresLogin: !isLoggedIn,
      },
      {
        name: 'Profile',
        icon: <ProfileIcon />,
        to: '/profile',
        requiresLogin: isLoggedIn,
      },
    ];

    if (isLoggedIn) {
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
