import {
  CartPage,
  CollectionPage,
  DeckBuilderPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  StorePage,
} from 'pages';
import {
  Store as StoreIcon,
  ShoppingCart as CartIcon,
  Assessment as CollectionIcon,
} from '@mui/icons-material';
import { Badge } from '@mui/material';
import DeckBuilderIcon from './DeckBuilderIcon';

function getRoutes() {
  const cartItemQuantity = JSON.parse(localStorage.getItem('cart'))?.items
    ?.length;
  const ROUTES = [
    {
      routerPath: '/',
      directoryPath: 'HomePage',
      component: HomePage,
      isPrivate: false,

      // navItem: true,
    },
    {
      routerPath: '/home',
      directoryPath: 'HomePage',
      component: HomePage,
      isPrivate: false,
      // navItem: true,
    },
    {
      routerPath: '/deckbuilder',
      directoryPath: 'DeckBuilderPage',
      component: DeckBuilderPage,
      isPrivate: false,
      name: 'Deck',

      icon: <DeckBuilderIcon iconColor="black" />,
      navItem: true,
    },
    {
      routerPath: '/store',
      directoryPath: 'StorePage',
      component: StorePage,
      isPrivate: false,
      name: 'Store',

      icon: <StoreIcon />,
      navItem: true,
    },
    {
      routerPath: '/cart',
      directoryPath: 'CartPage',
      component: CartPage,
      isPrivate: true,
      name: 'Cart',

      icon: (
        <Badge
          badgeContent={cartItemQuantity}
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
      navItem: true,
    },
    {
      routerPath: '/collection',
      directoryPath: 'CollectionPage',
      component: CollectionPage,
      isPrivate: true,
      name: 'Collection',

      icon: <CollectionIcon />,
      navItem: true,
    },
    {
      routerPath: '/profile',
      directoryPath: 'ProfilePage',
      component: ProfilePage,
      isPrivate: true,
      // navItem: true,
    },
    {
      routerPath: '/login',
      directoryPath: 'LoginPage',
      component: LoginPage,
      isPrivate: false,
    },
    {
      routerPath: '*',
      directoryPath: 'NotFoundPage',
      component: NotFoundPage,
      isPrivate: false,
    },
  ];
  return ROUTES;
}

export default getRoutes;
