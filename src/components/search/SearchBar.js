import React, { useState } from 'react';
import { Grid, Box, Typography, Container, Paper } from '@mui/material';
import { useCardStore } from '../../context/CardContext/CardStore';
import SearchButton from '../buttons/other/SearchButton';
import CardNameInput from '../other/InputComponents/CardNameInput';
import CustomSelector from '../other/InputComponents/CustomSelector';
import search from './search.json';
import { useMode } from '../../context/hooks/colormode';

const SearchBar = () => {
  const { theme } = useMode();
  const { initialState, filters } = search;

  const [searchParams, setSearchParams] = useState({
    name: '',
    type: '',
    attribute: '',
    race: '',
  });
  const { handleRequest } = useCardStore();
  // const handleChange = (name, newValue) => {
  //   setSearchParams((prev) => ({ ...prev, [name]: newValue }));
  // };
  const handleChange = (name, newValue) => {
    setSearchParams((prev) => ({ ...prev, [name]: newValue }));
  };
  // Correct handleSubmit to use handleRequest with searchParams
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   handleRequest(searchParams);
  // };
  const handleSubmit = () => {
    handleRequest(searchParams);
  };
  return (
    <Paper
      sx={{
        padding: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
        boxShadow: 3,
        margin: 'auto',
        width: '100%',
        maxWidth: 'md',
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <Container>
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 3,
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            textTransform: 'uppercase',
          }}
        >
          Search Cards
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CardNameInput
              value={searchParams.name}
              handleChange={(event) => handleChange('name', event.target.value)}
            />
          </Grid>
          {filters?.map((filter) => (
            <Grid item xs={12} sm={6} md={3} key={filter?.label}>
              <CustomSelector
                label={filter?.label}
                name={filter?.name}
                value={searchParams?.[filter?.label]}
                handleChange={(event) =>
                  handleChange(filter.label, event.target.value)
                }
                // handleChange={(event) =>
                //   handleChange(filter.name, event.target.value)
                // }
                // setValue={(newValue) =>
                //   handleChange({ target: { value: newValue } })
                // }
                // handleChange={handleChange}
                // setValue={(newValue) =>
                //   setSearchParams((prevState) => ({
                //     ...prevState,
                //     [filter?.name]: newValue,
                //   }))
                // }
                setSearchParams={setSearchParams}
                values={filter?.values}
              />
            </Grid>
          ))}
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 2,
            }}
          >
            <SearchButton handleSubmit={handleSubmit} />
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default SearchBar;
