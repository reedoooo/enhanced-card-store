import React, { useEffect, useState } from 'react';
import { TextField, Chip, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const RCTags = ({ name, control, setValue, getValues }) => {
  const [inputValue, setInputValue] = useState('');
  const chipData = getValues(name) || [];

  const handleDeleteChip = (chipToDelete) => {
    const newChipData = chipData.filter((chip) => chip !== chipToDelete);
    setValue(name, newChipData, { shouldValidate: true });
  };

  const handleAddChip = () => {
    if (inputValue && !chipData.includes(inputValue)) {
      const newChipData = [...chipData, inputValue];
      setValue(name, newChipData, { shouldValidate: true });
      setInputValue('');
    }
  };

  return (
    <>
      <TextField
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && inputValue) {
            e.preventDefault();
            handleAddChip();
          }
        }}
        variant="outlined"
        margin="normal"
        fullWidth
        label="Add Tag"
      />
      <IconButton onClick={handleAddChip} size="small">
        <AddCircleOutlineIcon />
      </IconButton>
      <div>
        {chipData.map((chip, index) => (
          <Chip
            key={index}
            label={chip}
            onDelete={() => handleDeleteChip(chip)}
          />
        ))}
      </div>
    </>
  );
};

export default RCTags;
