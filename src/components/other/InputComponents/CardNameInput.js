import React from 'react';
import { Input } from '@mui/material';
import { useCardStore } from '../../../context/CardContext/CardStore';

const CardNameInput = ({ value, setValue, handleChange }) => {
  const { handleRequest } = useCardStore();
  return (
    <Input
      fullWidth
      placeholder="Type card name"
      onChange={handleChange}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          handleRequest(value);
        }
      }}
      value={value}
    />
  );
};

export default CardNameInput;
