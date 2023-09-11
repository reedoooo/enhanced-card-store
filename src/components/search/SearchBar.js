import React from 'react';
import { Grid, Box, Typography, Container } from '@mui/material';
import { useCardStore } from '../../context/CardContext/CardStore';
import SearchButton from '../buttons/SearchButton';
import CardNameInput from '../other/CardNameInput';
import CustomSelector from '../other/CustomSelector';
import { useUtility } from '../../context/UtilityContext/UtilityContext';

const initialState = {
  name: '',
  race: '',
  type: '',
  attribute: '',
  level: '',
};

const SearchBar = () => {
  const { searchParams, setSearchParams } = useUtility(initialState);
  const { handleRequest } = useCardStore();

  const filters = [
    {
      label: 'Level',
      name: 'level',
      values: [
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
      ],
    },
    { label: 'Race', name: 'race', values: ['Unset', 'Aqua', 'Beast'] },
    {
      label: 'Type',
      name: 'type',
      values: ['Unset', 'Effect Monster', 'Flip Effect Monster'],
    },
    {
      label: 'Attribute',
      name: 'attribute',
      values: [
        'Unset',
        'Dark',
        'Divine',
        'Earth',
        'Fire',
        'Light',
        'Water',
        'Wind',
      ],
    },
  ];

  return (
    <Box sx={{ padding: 2, borderRadius: 2 }}>
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
          {filters.map((filter) => (
            <CustomSelector
              key={filter.name}
              label={filter.label}
              name={filter.name}
              value={searchParams[filter.name]}
              setValue={(newValue) =>
                setSearchParams((prevState) => ({
                  ...prevState,
                  [filter.name]: newValue,
                }))
              }
              values={filter.values}
            />
          ))}
          <SearchButton searchParams={searchParams} />
        </Grid>
      </Container>
    </Box>
  );
};

export default SearchBar;
