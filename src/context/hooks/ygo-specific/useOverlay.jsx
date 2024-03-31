import { useState, useMemo } from 'react';

export const useOverlay = (theme) => {
  const { rarity, rarityOverlay } = theme.palette;
  const [selectedRarity, setSelectedRarity] = useState('superRare');
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const overlayColor = useMemo(() => {
    return rarityOverlay[selectedRarity] || rarityOverlay['default'];
  }, [rarityOverlay, selectedRarity]);

  const handleRarityClick = (rarityInput) => {
    console.log(`Rarity ${rarityInput} was clicked.`);
    setSelectedRarity(rarityInput === selectedRarity ? '' : rarityInput);
    setIsOverlayVisible(!isOverlayVisible);
  };

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
          backgroundColor: overlayColor,
          opacity: 0.5,
        }}
      />
    );
  };

  return {
    selectedRarity,
    overlayColor,
    backgroundColor: overlayColor,
    isOverlayVisible,
    handleRarityClick,
    generateOverlay,
  };
};
