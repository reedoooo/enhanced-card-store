import { roundToNearestTenth } from '../../context/Helpers';
export default function prepareDeckData(deck) {
  const genData = {
    name: deck?.name,
    description: deck?.description,
    tags: deck?.tags,
    color: deck?.color,
  };
  const cards = deck?.cards?.map((card) => ({
    ...card,
    quantity: roundToNearestTenth(card?.quantity),
  }));
  const infoItems = [
    { label: 'Name', value: deck?.name },
    {
      label: 'Value',
      value: `$${roundToNearestTenth(deck?.totalPrice)}`,
    },
    { label: 'Cards', value: `${deck?.totalQuantity}` },
  ];
  return {
    genData,
    cards,
    infoItems,
  };
}
