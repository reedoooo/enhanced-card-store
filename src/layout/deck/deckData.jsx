import { roundToNearestTenth } from '../../context/Helpers';
import useSelectedDeck from '../../context/MAIN_CONTEXT/DeckContext/useSelectedDeck';

export default function prepareDeckData(deckId) {
  const { allDecks, allIds, selectedDeckId } = useSelectedDeck();
  const currentDeck = allDecks.find((d) => d._id === deckId);
  const genData = {
    name: currentDeck?.name,
    description: currentDeck?.description,
    tags: currentDeck?.tags,
    color: currentDeck?.color,
  };
  const cards = currentDeck?.cards?.map((card) => ({
    ...card,
    quantity: roundToNearestTenth(card?.quantity),
  }));
  const infoItems = [
    { label: 'Name', value: currentDeck?.name },
    {
      label: 'Value',
      value: `$${roundToNearestTenth(currentDeck?.totalPrice)}`,
    },
    { label: 'Cards', value: `${currentDeck?.totalQuantity}` },
  ];
  return {
    genData,
    cards,
    infoItems,
    allDecks: allDecks,
    ids: allIds,
    selectedDeckId,
  };
}
