// import { useState } from 'react';

// const useCardManager = (initialCards = []) => {
//   const [cards, setCards] = useState(initialCards);

//   // General function to update a card
//   const updateCard = (cardId, updatedData) => {
//     setCards((currentCards) =>
//       currentCards.map((card) =>
//         card.id === cardId ? { ...card, ...updatedData } : card
//       )
//     );
//   };

//   // Add a new card
//   const addCard = (newCardData) => {
//     setCards([...cards, newCardData]);
//   };

//   // General utility to update a specific field of a card
//   const updateField = (cardId, field, value) => {
//     updateCard(cardId, { [field]: value });
//   };

//   // Update a nested field like priceHistory or card_images
//   const updateNestedField = (cardId, field, newValue) => {
//     const card = cards.find((card) => card.id === cardId);
//     updateCard(cardId, { [field]: [...card[field], newValue] });
//   };

//   return {
//     cards,
//     addCard,
//     updateCard: updateField, // for updating single fields
//     updateNestedField, // for updating nested fields like arrays
//   };
// };

// export default useCardManager;
