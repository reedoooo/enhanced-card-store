// CombinedContext.js
import React, { createContext, useContext } from 'react';
import { DeckContext } from './DeckContext/DeckContext';
import { CartContext } from './CartContext/CartContext';
import { CollectionContext } from './CollectionContext/CollectionContext';

// Create the combined context
export const AppContext = createContext({});

// Create a provider component that combines the contexts
export const AppContextProvider = ({ children }) => {
  const Deck = useContext(DeckContext);
  const Cart = useContext(CartContext);
  const Collection = useContext(CollectionContext);

  // Combine the context values into one object
  const appContextValues = { Deck, Cart, Collection };

  return (
    <AppContext.Provider value={appContextValues}>
      {children}
    </AppContext.Provider>
  );
};
