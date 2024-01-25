import { useState } from 'react';

export const useOverlay = (theme) => {
  const [selectedRarity, setSelectedRarity] = useState(null); // State to track selected rarity

  // Function to handle rarity chip click
  const handleRarityClick = (rarity) => {
    setSelectedRarity(rarity);
    console.log(`Rarity ${rarity} was clicked.`);
  };

  // Function to generate the overlay component
  const generateOverlay = () => {
    if (!selectedRarity) return null;

    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: theme.palette.rarityOverlay[selectedRarity],
          opacity: 0.5, // Adjust the opacity as needed
        }}
      />
    );
  };

  return {
    selectedRarity,
    handleRarityClick,
    generateOverlay,
  };
};
