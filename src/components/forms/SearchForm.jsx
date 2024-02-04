import React, { useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import { useFormContext, useMode, usePageContext } from '../../context';
import FormField from '../reusable/FormField';
import { StyledFormPaper } from '../../pages/pageStyles/StyledComponents';

const SearchForm = ({ onFocus, onBlur }) => {
  const { theme } = useMode();
  const { returnDisplay, loadingStatus, setIsFormDataLoading } =
    usePageContext();
  const {
    errors,
    isSubmitting,
    currentFormType,
    onSubmit,
    register,
    handleChange,
    handleSubmit,
    setFormType,
  } = useFormContext();

  useEffect(() => setFormType('searchForm'), [setFormType]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit((data) => {
        onSubmit(data);
      });
    }
  };

  return (
    <StyledFormPaper
      theme={theme}
      sx={{
        background: theme.palette.backgroundB.lightest,
      }}
    >
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
        // theme={theme}
      >
        <FormField
          name="searchTerm"
          label="Search for cards"
          register={register}
          errors={errors}
          required
          value={currentFormType?.searchForm?.searchTerm}
          onChange={(event) => {
            const { name, value } = event.target;
            handleChange(name, value);
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={handleKeyPress}
          theme={theme}
        />
        {errors.searchTerm && (
          <Grid item xs={12}>
            <p>{errors.searchTerm.message}</p>
          </Grid>
        )}
        {/* <StyledTextField
          value={searchTerm}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          label="Search for cards"
          variant="outlined"
          fullWidth
          onKeyDown={handleKeyPress}
          theme={theme}
        /> */}
        <Button
          fullWidth
          variant="contained"
          disabled={isSubmitting}
          color="primary"
          type="submit"
          sx={{
            mt: 1,
            mb: 1,
            background: theme.palette.backgroundA.dark,
            '&:hover': { background: theme.palette.backgroundA.darkest },
          }}
        >
          {isSubmitting ? 'Loading...' : 'Search'}
        </Button>
        {errors.root && <p>{errors.root.message}</p>}
      </form>
    </StyledFormPaper>
  );
};

export default SearchForm;
