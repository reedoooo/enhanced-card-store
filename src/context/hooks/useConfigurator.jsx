import { useState } from 'react';

// Custom hook to manage configurator state
export const useConfigurator = () => {
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);

  const toggleConfigurator = () => {
    setIsConfiguratorOpen((prev) => !prev);
  };

  return { isConfiguratorOpen, toggleConfigurator };
};
