import React, { useCallback, useEffect, useState } from 'react';

export const SettingsContext = React.createContext();

const SettingsProvider = ({ children }) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [hideCompleted, setHideCompleted] = useState(true);
  const [sortBy, setSortBy] = useState('difficulty');

  const saveSettingsToLocalStorage = useCallback(() => {
    const settings = {
      itemsPerPage,
      hideCompleted,
      sortBy: sortBy.toLowerCase(),
    };
    localStorage.setItem('toDoSettings', JSON.stringify(settings));
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('toDoSettings');
    if (savedSettings) {
      const { itemsPerPage, hideCompleted, sortBy } = JSON.parse(savedSettings);
      setItemsPerPage(itemsPerPage);
      setHideCompleted(hideCompleted);
      setSortBy(sortBy);
    }
  }, []);

  useEffect(() => {
    saveSettingsToLocalStorage();
  }, [itemsPerPage, hideCompleted, sortBy, saveSettingsToLocalStorage]);

  const contextValue = {
    itemsPerPage,
    setItemsPerPage,
    hideCompleted,
    setHideCompleted,
    sortBy,
    setSortBy,
    saveSettingsToLocalStorage,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
