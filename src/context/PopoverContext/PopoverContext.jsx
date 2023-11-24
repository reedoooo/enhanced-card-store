import React, { createContext, useState } from 'react';

export const PopoverContext = createContext({
  hoveredCard: null,
  isPopoverOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setHoveredCard: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsPopoverOpen: () => {},
});

export const PopoverProvider = ({ children }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const value = {
    hoveredCard,
    isPopoverOpen,
    setHoveredCard,
    setIsPopoverOpen,
  };

  return (
    <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>
  );
};
