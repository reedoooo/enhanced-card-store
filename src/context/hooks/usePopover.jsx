import { useState } from 'react';

export const usePopover = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return {
    hoveredCard,
    isPopoverOpen,
    setHoveredCard,
    setIsPopoverOpen,
  };
};
