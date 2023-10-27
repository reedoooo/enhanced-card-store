import React, { useCallback, useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
export const SettingsContext = React.createContext();

const SettingsProvider = ({ children }) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [hideCompleted, setHideCompleted] = useState(true);
  const [sortBy, setSortBy] = useState('difficulty');
  const [showAlert, setShowAlert] = useState(false);

  const saveSettingsToLocalStorage = useCallback(() => {
    const settings = {
      itemsPerPage,
      hideCompleted,
      sortBy: sortBy.toLowerCase(),
    };
    localStorage.setItem('toDoSettings', JSON.stringify(settings));
    setShowAlert(true);
  }, [itemsPerPage, hideCompleted, sortBy]);

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
      {showAlert && (
        <Alert
          onClose={() => setShowAlert(false)}
          iconMapping={{
            success: <CheckCircleOutlineIcon fontSize="inherit" />,
          }}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => setShowAlert(false)}
            >
              CLOSE
            </Button>
          }
        >
          Settings have been saved successfully!
        </Alert>
      )}
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
