import { useState } from 'react';

const useCardVariantManager = (initialCards = []) => {
  const [cards, setCards] = useState(initialCards);

  // Function to identify the variant index
  const findVariantIndex = (cardId, setCode) =>
    cards.findIndex(
      (card) => card.id === cardId && card.card_set.set_code === setCode
    );

  // Function to determine overlay based on rarity
  const getOverlayByRarity = (rarity) => {
    // Define overlays for different rarities
    const overlays = {
      Common: 'commonOverlay',
      Rare: 'rareOverlay',
      'Ultra Rare': 'ultraRareOverlay',
      // ... other rarities
    };
    return overlays[rarity] || 'defaultOverlay';
  };

  // Function to update a specific variant field
  const updateVariantField = (cardId, setCode, field, value) => {
    const index = findVariantIndex(cardId, setCode);
    if (index < 0) return; // Variant not found

    const updatedCards = [...cards];
    updatedCards[index] = {
      ...updatedCards[index],
      [field]: value,
      // Update overlay based on rarity
      overlay: getOverlayByRarity(updatedCards[index].card_set.set_rarity),
    };
    setCards(updatedCards);
  };

  // Function to add a new variant
  const addVariant = (cardId, newVariantData) => {
    const updatedCards = [...cards];
    updatedCards.push({
      ...newVariantData,
      id: cardId,
      // Assign overlay based on rarity
      overlay: getOverlayByRarity(newVariantData.card_set.set_rarity),
    });
    setCards(updatedCards);
  };

  // Function to update nested fields like priceHistory for a specific variant
  const updateNestedField = (cardId, setCode, field, newValue) => {
    const index = findVariantIndex(cardId, setCode);
    if (index < 0) return; // Variant not found

    const updatedCards = [...cards];
    const variant = updatedCards[index];
    updatedCards[index] = {
      ...variant,
      [field]: [...variant[field], newValue],
    };
    setCards(updatedCards);
  };

  return {
    cards,
    addVariant,
    updateVariantField,
    updateNestedField,
  };
};

export default useCardVariantManager;
