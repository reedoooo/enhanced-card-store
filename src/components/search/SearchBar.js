import React from 'react';
import { Grid, Box, Typography, Container, Paper } from '@mui/material';
import { useCardStore } from '../../context/CardContext/CardStore';
import SearchButton from '../buttons/other/SearchButton';
import CardNameInput from '../other/InputComponents/CardNameInput';
import CustomSelector from '../other/InputComponents/CustomSelector';
import { useCombinedContext } from '../../context/CombinedProvider';
import { makeStyles } from '@mui/styles';
import search from './search.json';
const useStyles = makeStyles((theme) => ({
  searchContainer: {
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.12)',
    margin: theme.spacing(2, 'auto'),
    width: '100%',
    maxWidth: 'md',
  },
  title: {
    marginBottom: theme.spacing(3),
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  searchGrid: {
    gap: theme.spacing(2),
  },
  searchButtonContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
}));

const SearchBar = () => {
  const { searchParams, setSearchParams } = useCombinedContext();
  const { handleRequest } = useCardStore();
  const classes = useStyles();
  const { initialState, filters } = search; // Destructure the data from JSON

  return (
    <Paper className={classes.searchContainer}>
      <Container>
        <Typography variant="h4" align="center" className={classes.title}>
          Search Cards
        </Typography>
        <Grid container spacing={2} className={classes.searchGrid}>
          <Grid item xs={12}>
            <CardNameInput
              value={searchParams?.name}
              setValue={(newValue) =>
                setSearchParams((prevState) => ({
                  ...prevState,
                  name: newValue,
                }))
              }
              handleRequest={() => handleRequest(searchParams)}
            />
          </Grid>
          {filters?.map((filter) => (
            <Grid item xs={12} sm={6} md={3} key={filter?.name}>
              <CustomSelector
                label={filter?.label}
                name={filter?.name}
                value={searchParams?.[filter?.name]}
                setValue={(newValue) =>
                  setSearchParams((prevState) => ({
                    ...prevState,
                    [filter?.name]: newValue,
                  }))
                }
                values={filter?.values}
              />
            </Grid>
          ))}
          <Grid item xs={12} className={classes.searchButtonContainer}>
            <SearchButton searchParams={searchParams} />
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default SearchBar;
