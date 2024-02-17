// ConfiguratorContext.js
import React, { createContext, useContext, useState } from 'react';
const defaultConfiguratorState = {
  isConfiguratorOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleConfigurator: () => {},
};
const ConfiguratorContext = createContext(defaultConfiguratorState);

export const ConfiguratorProvider = ({ children }) => {
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);

  const toggleConfigurator = () => setIsConfiguratorOpen((prev) => !prev);

  return (
    <ConfiguratorContext.Provider
      value={{ isConfiguratorOpen, toggleConfigurator }}
    >
      {children}
    </ConfiguratorContext.Provider>
  );
};

export const useConfiguratorContext = () => useContext(ConfiguratorContext);
