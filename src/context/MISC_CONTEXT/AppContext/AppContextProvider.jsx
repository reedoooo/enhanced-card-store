// CombinedContext.js
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

// Create the combined context
export const AppContext = createContext(defaultContextValue.APP_CONTEXT);

// Create a provider component that combines the contexts
export const AppContextProvider = ({ children }) => {
  const [context, setContext] = useState({});
  const Deck = useContext(DeckContext);
  const Cart = useContext(CartContext);
  const Collection = useContext(CollectionContext);
  const [cardsWithQuantities, setCardsWithQuantities] = useState([]);
  const [allCardsWithQuantities, setAllCardsWithQuantities] = useLocalStorage(
    'allCardsWithQuantities'
  );

  const { selectedCollection, allCollections } = Collection;
  const { selectedDeck, allDecks } = Deck;
  const { cartData } = Cart;
  const isCardInContext = useCallback(
    (selectedCollection, selectedDeck, cartData, context, card) => {
      const cardsList = {
        Collection: selectedCollection?.cards,
        Deck: selectedDeck?.cards,
        Cart: cartData?.cart,
      };
      return !!cardsList[context]?.find((c) => c?.id === card?.id);
    },
    [context, selectedCollection, selectedDeck, cartData]
  );
  const compileCardsWithQuantities = () => {
    if (!selectedCollection && !selectedDeck && !cartData) return [];
    const deckCards = allDecks?.reduce((acc, deck) => {
      if (deck.cards) {
        acc = [...acc, ...deck.cards];
      }
      return acc;
    }, []);
    const cartCards = cartData?.cart || [];
    const collectionCards = allCollections?.reduce((acc, collection) => {
      if (collection.cards) {
        acc = [...acc, ...collection.cards];
      }
      return acc;
    }, []);

    // Combine cards from all contexts
    const combinedCards = [...deckCards, ...cartCards, ...collectionCards];
    // console.log('combinedCards:', combinedCards);
    // Calculate quantities and deduplicate
    const cardQuantities = combinedCards?.reduce((acc, card) => {
      // If the card already exists in the accumulator, increment its quantity
      if (acc[card.id]) {
        acc[card.id].quantity += card?.quantity;
      } else {
        // Otherwise, add the card with its current quantity
        acc[card.id] = { ...card, quantity: card.quantity };
      }
      return acc;
    }, {});
    // console.log('cardQuantities:', cardQuantities);

    // Convert the accumulator object back into an array of cards
    const quantities = Object.values(cardQuantities);
    // console.log('cardsWithQuantities:', quantities);
    setCardsWithQuantities(quantities);
    setAllCardsWithQuantities(quantities);

    return quantities;
  };

  // useEffect(() => {
  //   // Call compileCardsWithQuantities here or in response to specific changes
  //   compileCardsWithQuantities();
  // }, [selectedCollection, selectedDeck, cartData]); // Dependency array based on when you want to recalculate

  // Combine the context values into one object
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
    }),
    [Deck, Cart, Collection, isCardInContext] // Include cardsWithQuantities here
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
