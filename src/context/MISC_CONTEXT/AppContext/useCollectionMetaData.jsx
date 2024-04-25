import { useCallback, useEffect, useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import useManager from '../../useManager';

export const useCollectionMetaData = () => {
  const { collections: allCollections } = useManager();
  const [collectionMetaData, setCollectionMetaData] = useLocalStorage(
    'collectionMetaData',
    []
  );

  const compileCollectionMetaData = useCallback(() => {
    if (!allCollections || allCollections.length === 0) return;

    let totalValue = 0;
    let collectionCards = allCollections.reduce((acc, collection) => {
      const collectionPrice = parseFloat(collection?.totalPrice);
      if (isNaN(collectionPrice)) return acc;
      totalValue += collectionPrice;
      return acc.concat(collection.cards);
    }, []);

    const uniqueCards = new Map();
    collectionCards.forEach((card) => {
      if (
        !uniqueCards.has(card.id) &&
        card?.variant?.cardModel === 'CardInCollection'
      ) {
        uniqueCards.set(card.id, card);
      }
    });

    const uniqueCardsArray = Array.from(uniqueCards.values());
    const topFiveCardsInCollection = uniqueCardsArray
      .sort((a, b) => b.price - a.price)
      .slice(0, 5);

    const metaData = {
      totalValue,
      numCardsCollected: collectionCards.reduce(
        (total, card) => total + card.quantity,
        0
      ),
      numCollections: allCollections.length,
      topFiveCards: topFiveCardsInCollection,
      tooltips: [], // If tooltips are dynamically calculated, this needs to be adjusted
      pieChartData: allCollections.map((collection) => ({
        name: collection.name,
        value: parseFloat(collection.totalPrice),
      })),
    };

    console.log('META DATA', metaData);
    setCollectionMetaData(metaData);
  }, [allCollections, setCollectionMetaData]);

  useEffect(() => {
    compileCollectionMetaData();
  }, []);

  return {
    collectionMetaData,
    compileCollectionMetaData,
  };
};
