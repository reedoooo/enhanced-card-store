// CombinedContext.js
import React, { createContext, useCallback, useContext, useState } from 'react';
import { DeckContext } from '../../MAIN_CONTEXT/DeckContext/DeckContext';
import { CartContext } from '../../MAIN_CONTEXT/CartContext/CartContext';
import { CollectionContext } from '../../MAIN_CONTEXT/CollectionContext/CollectionContext';

// Create the combined context
export const AppContext = createContext({});

// Create a provider component that combines the contexts
export const AppContextProvider = ({ children }) => {
  const [context, setContext] = useState({});
  const Deck = useContext(DeckContext);
  const Cart = useContext(CartContext);
  const Collection = useContext(CollectionContext);
  const { selectedCollection } = Collection;
  const { selectedDeck } = Deck;
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
  // Combine the context values into one object
  const appContextValues = { Deck, Cart, Collection, isCardInContext };

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
