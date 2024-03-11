// import { useContext, useState, useEffect, useCallback } from 'react';
// import { DeckContext } from '../../MAIN_CONTEXT/DeckContext/DeckContext';
// import { CartContext } from '../../MAIN_CONTEXT/CartContext/CartContext';
// import { CollectionContext } from '../../MAIN_CONTEXT/CollectionContext/CollectionContext';
// import useLocalStorage from '../../hooks/useLocalStorage';

// const useMasterCardList = () => {
//   const [masterCardList, setMasterCardList] = useState([]);
//   const [allCardsWithQuantities, setAllCardsWithQuantities] = useLocalStorage(
//     'allCardsWithQuantities',
//     []
//   );
//   const Deck = useContext(DeckContext);
//   const Cart = useContext(CartContext);
//   const Collection = useContext(CollectionContext);
//   const [cardsWithQuantities, setCardsWithQuantities] = useState([]);
//   const { selectedCollection, allCollections } = Collection;
//   const { selectedDeck, allDecks } = Deck;
//   const { cartData } = Cart;

//   const compileCardsWithQuantities = () => {
//     if (!selectedCollection && !selectedDeck && !cartData) return [];
//     const deckCards = allDecks?.reduce((acc, deck) => {
//       if (deck.cards) {
//         acc = [...acc, ...deck.cards];
//       }
//       return acc;
//     }, []);
//     const cartCards = cartData?.cart || [];
//     const collectionCards = allCollections?.reduce((acc, collection) => {
//       if (collection?.cards) {
//         acc = [...acc, ...collection.cards];
//       }
//       return acc;
//     }, []);
//   return {
//     cardsWithQuantities,
//     allCardsWithQuantities /* any other values or functions to expose */,
//   };
// };



