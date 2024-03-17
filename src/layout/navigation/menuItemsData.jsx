import React from 'react';
import {
  Home as HomeIcon,
  Store as StoreIcon,
  ShoppingCart as CartIcon,
  Assessment as CollectionIcon,
  Person as ProfileIcon,
} from '@mui/icons-material';
import DeckBuilderIcon from '../REUSABLE_COMPONENTS/icons/DeckBuilderIcon';
import { Badge } from '@mui/material';
import { useCartStore } from '../../context/MAIN_CONTEXT/CartContext/CartContext';
export const getMenuItemsData = (isLoggedIn, cartCardQuantity, iconColor) => {
  // const { cartCardQuantity } = useCartStore();
  try {
    const baseMenuItems = [
      { name: 'Home', icon: <HomeIcon />, to: '/home', requiresLogin: false },
      {
        name: 'Deck Builder',
        // icon: <DeckOfCardsIcon />,
        icon: <DeckBuilderIcon color={iconColor} />,
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
            color="primary"
            // backgroundColor="primary"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
              paddingRight: '1rem',
            }}
            sx={{
              '& .MuiBadge-badge': {
                right: 3,
                // top: 13,
                // border: `2px solid ${theme.palette.background.paper}`,
                padding: '0.25rem',
                marginLeft: 0.5,
                marginTop: 0.25,
              },
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

    // Processed menu items
    const processedMenuItems = isLoggedIn
      ? baseMenuItems.map((item) => ({ ...item, requiresLogin: false }))
      : baseMenuItems;

    return {
      baseMenuItems,
      menuItems: processedMenuItems,
    };
  } catch (error) {
    console.error('An error occurred in getMenuItemsData:', error);
    return {
      baseMenuItems: [],
      menuItems: [],
    };
  }
};

export default getMenuItemsData;
