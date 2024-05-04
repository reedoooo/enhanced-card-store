import { roundToNearestTenth } from 'context/Helpers';
function prepareDeckData(deck, cards) {
  const genData = {
    name: deck?.name,
    description: deck?.description,
    tags: deck?.tags,
    color: deck?.color,
  };
  // const cards = deck?.cards?.map((card) => ({
  //   ...card,
  //   quantity: roundToNearestTenth(card?.quantity),
  // }));
  const infoItems = [
    { label: 'Name', value: deck?.name },
    {
      label: 'Value',
      value: `$${roundToNearestTenth(deck?.totalPrice)}`,
    },
    { label: 'Cards', value: `${deck?.totalQuantity}` },
    { label: 'Unique Cards', value: `${cards?.length}` },
    { label: 'Tags', value: deck?.tags?.join(', ') },
    { label: 'Color', value: deck?.color },
  ];
  return {
    genData,
    infoItems,
  };
}
