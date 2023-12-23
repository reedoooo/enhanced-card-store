export const getTypographyVariant = () => {
  if (isXSmall) return 'h4';
  if (isSmall) return 'h3';
  if (isMedium) return 'h2';
  return 'h2';
};
export const getIconForTitle = (title) => {
  switch (title) {
    case 'Deck Builder':
      return <DeckOfCardsIcon />;
    case 'Collection Tracker':
      return <MoneyIcon />;
    case 'Store':
      return <ChartsIcon />;
    default:
      return null;
  }
};
