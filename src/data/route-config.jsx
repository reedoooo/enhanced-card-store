// const ROUTES = [
//   { path: '/', componentName: 'HomePage', isPrivate: false },
//   { path: '/home', componentName: 'HomePage', isPrivate: false },
//   { path: '/deckbuilder', componentName: 'DeckBuilderPage', isPrivate: false },
//   { path: '/store', componentName: 'StorePage', isPrivate: false },
//   { path: '/cart', componentName: 'CartPage', isPrivate: true },
//   { path: '/collection', componentName: 'CollectionPage', isPrivate: true },
//   { path: '/profile', componentName: 'ProfilePage', isPrivate: true },
//   // { path: '/login', componentName: 'LoginDialog', isPrivate: false },
//   { path: '/login', componentName: 'LoginPage', isPrivate: false },
//   // { path: '/loginPage', componentName: 'LoginPage', isPrivate: false },
//   { path: '/signup', componentName: 'SignupPage', isPrivate: false },
//   // { path: '/about', componentName: 'AboutPage', isPrivate: false },
//   // { path: '/contact', componentName: 'ContactPage', isPrivate: false },
//   // { path: '/terms', componentName: 'TermsPage', isPrivate: false },
//   // { path: '/privacy', componentName: 'PrivacyPage', isPrivate: false },
//   { path: '*', componentName: 'NotFoundPage', isPrivate: false },
// ];

import { NotFoundPage } from 'layout/REUSABLE_COMPONENTS';
import {
  CartPage,
  CollectionPage,
  DeckBuilderPage,
  HomePage,
  LoginPage,
  ProfilePage,
  StorePage,
} from 'pages';

// const ROUTE_CONFIG = {
//   defaultPath: '/',
//   routes: ROUTES.map(({ path, componentName, isPrivate }) => ({
//     path,
//     componentName,
//     isPrivate,
//   })),
// };

// export { ROUTES, ROUTE_CONFIG };
// First, import all the necessary components

// Then, refactor the ROUTES to use component references directly
const ROUTES = [
  { path: '/', component: HomePage, isPrivate: false },
  { path: '/home', component: HomePage, isPrivate: false },
  { path: '/deckbuilder', component: DeckBuilderPage, isPrivate: false },
  { path: '/store', component: StorePage, isPrivate: false },
  { path: '/cart', component: CartPage, isPrivate: true },
  { path: '/collection', component: CollectionPage, isPrivate: true },
  { path: '/profile', component: ProfilePage, isPrivate: true },
  { path: '/login', component: LoginPage, isPrivate: false },
  // { path: '/signup', component: SignupPage, isPrivate: false },
  { path: '*', component: NotFoundPage, isPrivate: false },
];

// Export ROUTES and the refactored ROUTE_CONFIG
export { ROUTES };
