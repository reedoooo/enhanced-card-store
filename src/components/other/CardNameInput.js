import React from 'react';
import { Input } from '@mui/material';
import { useCardStore } from '../../context/CardContext/CardStore';

const CardNameInput = ({ value, setValue }) => {
  const { handleRequest } = useCardStore();

  // const handleKeyDown = (event) => {
  //   if (event.key === 'Enter') {
  //     handleRequest(searchParams); // Use handleRequest from context
  //   }
  // };

  // const handleChange = (event) => {
  //   setSearchParams((prevState) => ({
  //     ...prevState,
  //     name: event.target.value,
  //   }));
  // };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleRequest(); // Use handleRequest from context
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Input
      fullWidth
      placeholder="Type card name"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};

export default CardNameInput;
