import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { DeckContext } from '../../MAIN_CONTEXT/DeckContext/DeckContext';
import { CartContext } from '../../MAIN_CONTEXT/CartContext/CartContext';
import { CollectionContext } from '../../MAIN_CONTEXT/CollectionContext/CollectionContext';
import { defaultContextValue } from '../../constants';
import useLocalStorage from '../../hooks/useLocalStorage';
import useSelectedCollection from '../../MAIN_CONTEXT/CollectionContext/useSelectedCollection';
import useSelectedContext from '../../hooks/useSelectedContext';

const AppContext = createContext(defaultContextValue.APP_CONTEXT);

export const AppContextProvider = ({ children }) => {
  const Deck = useContext(DeckContext);
  const Cart = useContext(CartContext);
  const Collection = useContext(CollectionContext);
  const { selectedContext } = useSelectedContext();
  const [cardsWithQuantities, setCardsWithQuantities] = useState([]);
  // const [allCardsWithQuantities, setAllCardsWithQuantities] = useLocalStorage(
  //   'allCardsWithQuantities',
  //   []
  // );
  const [collectionMetaData, setCollectionMetaData] = useLocalStorage(
    'collectionMetaData',
    []
  );
  const { selectedCollection, allCollections } = Collection;
  const { allIds } = useSelectedCollection();
  const { selectedDeck, allDecks } = Deck;
  const { cartData } = Cart;
  // const createMarkers = (selectedCollection) => {
  //   if (!selectedCollection || !selectedCollection.collectionStatistics)
  //     return [];

  //   const { highPoint, lowPoint, avgPrice, percentageChange } =
  //     selectedCollection.collectionStatistics;
  //   return [
  //     {
  //       axis: 'y',
  //       value: percentageChange,
  //       lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
  //       legend: `${selectedCollection.name} High`,
  //       legendOrientation: 'vertical',
  //     },
  //     {
  //       axis: 'y',
  //       value: lowPoint,
  //       lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
  //       legend: `${selectedCollection.name} Low`,
  //       legendOrientation: 'vertical',
  //     },
  //     {
  //       axis: 'y',
  //       value: avgPrice,
  //       lineStyle: { stroke: '#b0413e', strokeWidth: 2 },
  //       legend: `${selectedCollection.name} Avg`,
  //       legendOrientation: 'vertical',
  //     },
  //   ];
  // };
  // const markers = useMemo(() => {
  //   if (!selectedCollection) return [];
  //   return createMarkers(selectedCollection);
  // }, [allCollections]); // Add dependencies as necessary, e.g., someSelectedCollectionId
  const compileCollectionMetaData = useCallback(() => {
    if (!allCollections || allCollections.length === 0) return;

    const metaData = {
      totalValue: allCollections?.reduce(
        (total, collection) => total + collection?.totalPrice,
        0
      ),
      numCardsCollected: allCollections?.reduce((total, collection) => {
        const collectionTotal = collection?.cards?.reduce(
          (collectionTotal, card) => {
            // Use the quantity property of each card, defaulting to 1 if not available
            return collectionTotal + (card?.quantity || 1);
          },
          0
        );
        return total + collectionTotal;
      }, 0),
      numCollections: allIds?.length || 0,
      topFiveCards: cardsWithQuantities
        ?.sort((a, b) => b.price - a.price)
        .slice(0, 5),
    };

    setCollectionMetaData(metaData);
  }, []);
  const selectedCollectionMetaData = useMemo(() => {
    if (!selectedCollection) return;

    const metaData = {
      totalValue: selectedCollection?.totalPrice,
      numCardsCollected: selectedCollection?.cards?.reduce((total, card) => {
        // Use the quantity property of each card, defaulting to 1 if not available
        return total + (card?.quantity || 1);
      }, 0),
      numCollections: 1,
      topFiveCards: cardsWithQuantities
        ?.sort((a, b) => b.price - a.price)
        .slice(0, 5),
    };

    return metaData;
  }, [selectedCollection, cardsWithQuantities]);

  const isCardInContext = useCallback(
    (card) => {
      const cardsList = {
        Collection: selectedCollection?.cards,
        Deck: selectedDeck?.cards,
        Cart: cartData?.cart,
      };
      return !!cardsList[selectedContext]?.find((c) => c?.id === card?.id);
    },
    [selectedContext, selectedCollection, selectedDeck, cartData]
  );
  const compileCardsWithQuantities = () => {
    if (!selectedCollection && !selectedDeck && !cartData) return [];
    const deckCards = allDecks?.reduce((acc, deck) => {
      if (deck?.cards) {
        acc = [...acc, ...deck.cards];
      }
      return acc;
    }, []);
    const cartCards = cartData?.cart || [];
    const collectionCards = allCollections?.reduce((acc, collection) => {
      if (collection?.cards) {
        acc = [...acc, ...collection.cards];
      }
      return acc;
    }, []);
    const combinedCards = [...deckCards, ...cartCards, ...collectionCards];
    const cardQuantities = combinedCards?.reduce((acc, card) => {
      if (acc[card.id]) {
        acc[card.id].quantity += card?.quantity;
      } else {
        acc[card.id] = { ...card, quantity: card.quantity };
      }
      return acc;
    }, {});

    const quantities = Object.values(cardQuantities);
    setCardsWithQuantities(combinedCards);
    // setAllCardsWithQuantities(combinedCards);

    return quantities;
  };

  useEffect(() => {
    compileCardsWithQuantities();
  }, []); // Dependency array based on when you want to recalculate
  useEffect(() => {
    compileCollectionMetaData();
  }, [compileCollectionMetaData]); // Re-calculate metadata when allCollections changes

  const appContextValues = useMemo(
    () => ({
      Deck,
      Cart,
      Collection,
      selectedCollection,
      allCollections,
      selectedDeck,
      allDecks,
      cartData,
      cardQuantities: compileCardsWithQuantities(),
      cardsWithQuantities: cardsWithQuantities,
      // ACTIONS
      getCardQuantities: compileCardsWithQuantities,
      isCardInContext,
      checkIfCardIsInContext: isCardInContext,
      collectionMetaData,
    }),
    [
      Deck,
      Cart,
      Collection,
      isCardInContext,
      collectionMetaData,
      // cardsWithQuantities,
    ] // Include cardsWithQuantities here
  );

  return (
    <AppContext.Provider value={appContextValues}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
};
