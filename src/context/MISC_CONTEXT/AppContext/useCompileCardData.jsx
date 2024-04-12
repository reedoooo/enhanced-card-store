import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCartManager } from '../../MAIN_CONTEXT/CartContext/useCartManager';
import useSelectedCollection from '../../MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useSelectedDeck from '../../MAIN_CONTEXT/DeckContext/useSelectedDeck';
import useSelectedContext from '../../hooks/useSelectedContext';
import useLocalStorage from '../../hooks/useLocalStorage';

export const useCompileCardData = () => {
  const { selectedDeck, allDecks } = useSelectedDeck();
  const { selectedCollection, allCollections, updateCollectionField } =
    useSelectedCollection();
  const { cart } = useCartManager();
  const { selectedContext } = useSelectedContext();
  const [collectionMetaData, setCollectionMetaData] = useLocalStorage(
    'collectionMetaData',
    []
  );
  const [cardsWithQuantities, setCardsWithQuantities] = useLocalStorage(
    'cardsWithQuantities',
    []
  );
  const [allUserCards, setAllUserCards] = useLocalStorage('allUserCards', []);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24hr');
  const [selectedStat, setSelectedStat] = useState('highpoint');
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [chartData, setChartData] = useState({});
  // const [chartData, setChartData] = useState(
  //   selectedCollection.averagedChartData[selectedTimeRange]
  // );
  // useEffect(() => {
  //   const newData = selectedCollection?.averagedChartData[selectedTimeRange];
  //   console.log(newData);
  //   if (newData) {
  //     console.log('NEW DATA FOR CHART', newData);
  //     setChartData(newData);
  //     updateCollectionField(
  //       selectedCollection._id,
  //       'selectedChartData',
  //       newData
  //     );
  //   }
  // }, []);
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
    const cardQuantities = cards?.reduce((acc, card) => {
      acc[card.id] = card.quantity;
      return acc;
    }, {});
    console.log('CARD QUANTITIES', cardQuantities);
    setCardsWithQuantities(cardQuantities);
    setAllUserCards(cards);
    return cards;
  }, [allCollections[selectedCollection?._id]?.cards]);
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
  const compileCollectionMetaData = useCallback(() => {
    if (!allCollections || allCollections?.length === 0) return;
    const cards = compileCardsWithQuantities();
    let collectionCards = [];
    let totalValue = 0;
    allCollections.forEach((collection) => {
      const collectionPrice = parseFloat(collection?.totalPrice);
      if (isNaN(collectionPrice)) return;
      // collectionCards.push({
      //   id: collection._id,
      //   name: collection.name,
      //   price: collectionPrice,
      // });
      totalValue += collectionPrice;
    });
    allCollections.forEach((collection) => {
      if (!collection.cards) return;
      collectionCards.push(...collection.cards);
    });
    const uniqueCards = new Map();
    cards.forEach((card) => {
      if (!uniqueCards.has(card.id)) {
        if (card?.variant?.cardModel === 'CardInCollection')
          uniqueCards.set(card.id, card);
      }
    });
    const uniqueCardsArray = Array.from(uniqueCards.values());
    const topFiveCardsInCollection = uniqueCardsArray
      .sort((a, b) => b.price - a.price)
      .slice(0, 5);
    const metaData = {
      totalValue: totalValue,
      numCardsCollected: collectionCards?.reduce((total, card) => {
        return total + card.quantity;
        // return total + collection.cards.reduce((total, card) => total + card.quantity, 0);
      }, 0),
      numCollections: allCollections?.length || 0,
      topFiveCards: topFiveCardsInCollection,
      tooltips: [],
      pieChartData: allCollections?.map((collection) => ({
        name: collection.name,
        value: parseFloat(collection.totalPrice), // Ensure value is a number
      })),
    };
    // allCollections.reduce((meta, collection) => {
    //   meta.tooltips.push(
    //     `${collection?.name}: $${collection?.totalPrice.toFixed(2)}`
    //   );
    //   return meta;
    // }, metaData);
    // allCollections.forEach((collection) => {
    //   // const collectionTotal = collection?.cards?.reduce(
    //   //   (collectionTotal, card) => {
    //   //     // Use the quantity property of each card, defaulting to 1 if not available
    //   //     return collectionTotal + (card?.quantity || 1);
    //   //   },
    //   //   0
    //   // );
    //   // metaData.tooltips.push({
    //   //   // name: collection.name,
    //   //   name: `${collection?.name}: $${collection?.totalPrice?.toFixed(2)}`,
    //   //   value: collection?.totalPrice?.toFixed(2),
    //   // });
    // });

    console.log('META DATA', metaData);
    setCollectionMetaData(metaData);
  }, [allCollections, setCollectionMetaData]);

  return {
    compileCardsWithQuantities,
    isCardInContext,
    compileCollectionMetaData,
    collectionMetaData,
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
