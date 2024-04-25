import { useCallback, useState } from 'react';
import useSelectedContext from '../../hooks/useSelectedContext';
import useLocalStorage from '../../hooks/useLocalStorage';
import useManager from '../../useManager';
import { useCollectionMetaData } from './useCollectionMetaData'; // Ensure the path is correct

export const useCompileCardData = () => {
  const {
    selectedCollection,
    collections: allCollections,
    selectedDeck,
    decks: allDecks,
    cart,
  } = useManager();
  const { selectedContext } = useSelectedContext();
  const [cardsWithQuantities, setCardsWithQuantities] = useLocalStorage(
    'cardsWithQuantities',
    []
  );
  const [allUserCards, setAllUserCards] = useLocalStorage('allUserCards', []);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24hr');
  const [selectedStat, setSelectedStat] = useState('highpoint');
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [chartData, setChartData] = useState({});

  const { collectionMetaData, compileCollectionMetaData } =
    useCollectionMetaData();

  const compileCardsWithQuantities = useCallback(() => {
    if (!allCollections && !allDecks && !cart) return [];

    const cards = [...(cart?.items || [])];
    allCollections.forEach((collection) => {
      if (!collection.cards) return;
      cards.push(...collection.cards);
    });
    allDecks.length > 1 &&
      allDecks?.forEach((deck) => {
        cards.push(...deck.cards);
      });

    console.log('COMPILING ALL CARDS WITH QUANTITIES', cards);
    setAllUserCards(cards);

    const cardQuantities = cards.reduce((acc, card) => {
      acc[card.id] = (acc[card.id] || 0) + card.quantity;
      return acc;
    }, {});

    console.log('CARD QUANTITIES', cardQuantities);
    setCardsWithQuantities(cardQuantities);
    return cards;
  }, [allCollections, allDecks, cart, setAllUserCards, setCardsWithQuantities]);

  const isCardInContext = useCallback(
    (card) => {
      const cardsList = {
        Collection: selectedCollection?.cards,
        Deck: selectedDeck?.cards,
        Cart: cart?.items,
      };
      return !!cardsList[selectedContext]?.find((c) => c?.id === card?.id);
    },
    [selectedContext, selectedCollection, selectedDeck, cart]
  );

  return {
    compileCardsWithQuantities,
    isCardInContext,
    collectionMetaData,
    compileCollectionMetaData,
    cardsWithQuantities,
    setCardsWithQuantities,
    allUserCards,
    setAllUserCards,
    selectedTimeRange,
    setSelectedTimeRange,
    selectedStat,
    setSelectedStat,
    selectedTheme,
    setSelectedTheme,
    selectedContext,
    chartData,
    setChartData,
  };
};
