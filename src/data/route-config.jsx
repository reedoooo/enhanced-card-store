export const ROUTES = [
  { path: '/', componentName: 'HomePage', isPrivate: false },
  { path: '/home', componentName: 'HomePage', isPrivate: false },
  { path: '/deckbuilder', componentName: 'DeckBuilderPage', isPrivate: false },
  { path: '/store', componentName: 'StorePage', isPrivate: false },
  { path: '/cart', componentName: 'CartPage', isPrivate: true },
  { path: '/collection', componentName: 'CollectionPage', isPrivate: true },
  { path: '/profile', componentName: 'ProfilePage', isPrivate: true },
  { path: '/login', componentName: 'LoginDialog', isPrivate: false },
  { path: '/signup', componentName: 'SignupPage', isPrivate: false },
  { path: '/about', componentName: 'AboutPage', isPrivate: false },
  { path: '/contact', componentName: 'ContactPage', isPrivate: false },
  { path: '/terms', componentName: 'TermsPage', isPrivate: false },
  { path: '/privacy', componentName: 'PrivacyPage', isPrivate: false },
  { path: '*', componentName: 'NotFoundPage', isPrivate: false },
];

export const ROUTE_CONFIG = {
  defaultPath: '/',
  routes: ROUTES.map(({ path, componentName, isPrivate }) => ({
    path,
    componentName,
    isPrivate,
  })),
};
