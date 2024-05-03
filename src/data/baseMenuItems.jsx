import React from 'react';
import {
  Store as StoreIcon,
  ShoppingCart as CartIcon,
  Assessment as CollectionIcon,
} from '@mui/icons-material';
import DeckBuilderIcon from '../layout/REUSABLE_COMPONENTS/icons/DeckBuilderIcon';
import { Badge } from '@mui/material';

export const baseMenuItems = ({ cartCardQuantity }) => [
  {
    name: 'Deck',
    icon: <DeckBuilderIcon iconColor="black" />,
    to: '/deckbuilder',
    requiresLogin: false,
  },
  {
    name: 'Collection',
    icon: <CollectionIcon />,
    to: '/collection',
    requiresLogin: true,
  },
  {
    name: 'Store',
    icon: <StoreIcon />,
    to: '/store',
    requiresLogin: true,
  },
  {
    name: 'Cart',
    icon: (
      <Badge
        badgeContent={cartCardQuantity}
        color="primary"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left', // Ensures badge is aligned to the left
        }}
        sx={{
          '& .MuiBadge-badge': {
            left: 0, // Positions badge on the left side
            transform: 'scale(1) translate(-70%, -70%)', // Adjust position relative to the icon
            marginLeft: '0', // Remove any default margin
          },
        }}
      >
        <CartIcon />
      </Badge>
    ),
    to: '/cart',
    requiresLogin: true,
  },
];
