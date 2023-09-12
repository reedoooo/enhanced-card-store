// Importações
import React from 'react';
import { Grid } from '@mui/material';
import SearchButton from '../buttons/SearchButton';
import CardNameInput from '../other/CardNameInput';

const PortfolioCardSearch = ({
  searchParams,
  setSearchParams,
  handleRequest,
}) => (
  <Grid item xs={12}>
    <CardNameInput
      value={searchParams}
      setValue={(newValue) =>
        setSearchParams((prevState) => ({
          ...prevState,
          name: newValue,
        }))
      }
      handleRequest={() => handleRequest(searchParams)}
    />
    <SearchButton searchParams={searchParams || []} />
  </Grid>
);

export default PortfolioCardSearch;
