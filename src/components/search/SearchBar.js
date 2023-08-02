import React, { useState } from 'react';
import { Grid, Box, Typography, Container } from '@mui/material';
import { useCardStore } from '../../context/CardContext/CardStore';
import SearchButton from '../buttons/SearchButton';
import CardNameInput from '../other/CardNameInput';
import CustomSelector from '../other/CustomSelector';
// import CardNameInput from '../input/CardNameInput';
// import CustomSelector from '../selector/CustomSelector';

const initialState = {
  name: '',
  race: '',
  type: '',
  attribute: '',
  level: '',
};

const SearchBar = () => {
  const [searchParams, setSearchParams] = useState(initialState);
  const { handleRequest } = useCardStore();

  const levels = [
    'Unset',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];
  const races = ['Unset', 'Aqua', 'Beast'];
  const types = ['Unset', 'Effect Monster', 'Flip Effect Monster'];
  const attributes = [
    'Unset',
    'Dark',
    'Divine',
    'Earth',
    'Fire',
    'Light',
    'Water',
    'Wind',
  ];

  return (
    <Box
      sx={{
        padding: 2,
        overflowY: 'scroll',
        height: '20vh',
        borderRadius: 2,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Search Cards
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CardNameInput
              value={searchParams.name}
              setValue={(newValue) =>
                setSearchParams((prevState) => ({
                  ...prevState,
                  name: newValue,
                }))
              }
              handleRequest={() => handleRequest(searchParams)}
            />
          </Grid>
          <CustomSelector
            label="Level"
            name="level"
            value={searchParams.level}
            setValue={(newValue) =>
              setSearchParams((prevState) => ({
                ...prevState,
                level: newValue,
              }))
            }
            values={levels}
          />
          <CustomSelector
            label="Race"
            name="race"
            value={searchParams.race}
            setValue={(newValue) =>
              setSearchParams((prevState) => ({ ...prevState, race: newValue }))
            }
            values={races}
          />
          <CustomSelector
            label="Type"
            name="type"
            value={searchParams.type}
            setValue={(newValue) =>
              setSearchParams((prevState) => ({ ...prevState, type: newValue }))
            }
            values={types}
          />
          <CustomSelector
            label="Attribute"
            name="attribute"
            value={searchParams.attribute}
            setValue={(newValue) =>
              setSearchParams((prevState) => ({
                ...prevState,
                attribute: newValue,
              }))
            }
            values={attributes}
          />
          <SearchButton searchParams={searchParams} />
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchBar;
